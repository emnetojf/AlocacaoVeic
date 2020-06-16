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
  selector: "edit-aloc",
  templateUrl: "./edit-aloc-comp.html",
  styleUrls: ["./edit-aloc-comp.css"]
})

export class EditAlocComp implements OnInit {

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

    var editlocacao = sessionStorage.getItem('editAlocacao');
    if (editlocacao) {
      this.alocacao = JSON.parse(editlocacao);

      this.veiculoserv.listaVeiculo(this.alocacao.veiculoId).subscribe(
        veic => {
          this.veiculo = veic;


          console.log(this.alocacao);
          console.log(this.veiculo);

          let data = (document.getElementById("dtfim") as HTMLInputElement);
          data.value = String(this.alocacao.dtFim.toString().split('T')[0]);

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

    var dtFim = (document.getElementById("dtfim") as HTMLInputElement).value;

    this.dtfinal = new Date(dtFim);

    this.dtinicial = new Date(this.alocacao.dtInicio.toString())

    const diff = this.dtfinal.getTime() - Math.abs(this.dtinicial.getTime());
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (dias <= 0 || dtFim == "") {
      this.Total = 0;
    }
    else {
      console.log(this.veiculo.douPreco);
      console.log(dias);
      this.Total = this.veiculo.douPreco * dias;
    }
  }



  public realizaAlocacao() {
    this.ativar_spinner = true;

    this.alocacao.dtFim = this.dtfinal;

    this.veiculo.booALOCADO = true

    this.alocacaoserv.cadastroAlocacao(this.alocacao).subscribe(
      veicAloc => {
        console.log(this.alocacao);


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

        this.msgErro = "";
        this.ativar_spinner = false;

        this.notificacao.showSucesso("Veículo alocado com sucesso", "Sucesso");

        sessionStorage.setItem("veicAlocacao", "");
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
    sessionStorage.setItem('editAlocacao', "");
    this.router.navigate(['/pesq-aloc']);
  }

}
