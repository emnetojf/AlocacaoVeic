import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veiculo } from '../../../modelo/veiculo';
import { Alocacao } from '../../../modelo/alocacao';
import { Usuario } from '../../../modelo/usuario';
import { AlocacaoServico } from '../../../servico/alocacao-servico';
import { NotificacaoServico } from '../../../servico/notificacao-servico';
import { VeiculoServico } from '../../../servico/veiculo-servico';
import { match } from 'assert';

@Component({
  selector: "del-aloc",
  templateUrl: "./excluir-aloc-comp.html",
  styleUrls: ["./excluir-aloc-comp.css"]
})

export class ExcluirAlocComp implements OnInit {

  public veiculo: Veiculo;
  public usuario: Usuario;
  public alocacao: Alocacao;
  public dtinicial: Date;
  public dtfinal: Date;
  public Total: number;

  public validaAloc: boolean;

  public ativar_spinner: boolean;
  public msgErro: string;


  constructor(private alocacaoserv: AlocacaoServico,
    private notificacao: NotificacaoServico, private veiculoserv: VeiculoServico,
    private router: Router) {

  }


  ngOnInit(): void {

    var excluirlocacao = sessionStorage.getItem('delAlocacao');
    if (excluirlocacao) {
      this.alocacao = JSON.parse(excluirlocacao);

      this.veiculoserv.listaVeiculo(this.alocacao.veiculoId).subscribe(
        veic => {
          this.veiculo = veic;

          console.log(this.alocacao);
          console.log(this.veiculo);

          this.Total = 0;
          this.calcularTotal();
  
        },
        e => {
          console.log(e.error);
          this.ativar_spinner = false;
          this.msgErro = e.error;
          this.notificacao.showErro("Ocorreu um erro!", "Erro");
        }
      );

           
    }
  }



  public calcularTotal() {
        
    this.dtinicial = new Date(this.alocacao.dtInicio.toString())
    this.dtfinal = new Date(this.alocacao.dtFim.toString());


    const diff = this.dtfinal.getTime() - Math.abs(this.dtinicial.getTime());
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

    console.log(this.veiculo.douPreco);
    console.log(dias);
    this.Total = this.veiculo.douPreco * dias;
    
  }



  public excluiAlocacao() {
    this.ativar_spinner = true;

    this.veiculo.booALOCADO = false

    console.log(this.alocacao);
    console.log(this.veiculo);

    
    this.veiculoserv.cadastroVeiculo(this.veiculo).subscribe(
      veicAlocado => {
      },
      e => {
        console.log(e.error);
        this.ativar_spinner = false;
        this.msgErro = e.error;
        this.notificacao.showErro("Ocorreu um erro!", "Erro");
      }
    );

    this.alocacaoserv.deleteAlocacao(this.alocacao).subscribe(
      veicAloc => {

        this.msgErro = "";
        this.ativar_spinner = false;

        this.notificacao.showAtencao("Alocação excluída com sucesso!", "Excluído")

        sessionStorage.setItem("delAlocacao", "");
        this.router.navigate(['/pesq-aloc']);

      },
      e => {
        console.log(e.error);
        this.ativar_spinner = false;
        this.msgErro = e.error;
        this.notificacao.showErro("Ocorreu um erro!", "Erro");
      }
    );
    
  }


  public cancelarVeiculo() {
    sessionStorage.setItem('delAlocacao', "");
    this.router.navigate(['/pesq-aloc']);
  }

}
