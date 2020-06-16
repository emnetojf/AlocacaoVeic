import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veiculo } from '../../modelo/veiculo';
import { Alocacao } from '../../modelo/alocacao';
import { Usuario } from '../../modelo/usuario';
import { AlocacaoServico } from '../../servico/alocacao-servico';
import { NotificacaoServico } from '../../servico/notificacao-servico';
import { VeiculoServico } from '../../servico/veiculo-servico';
import { UsuarioServico } from '../../servico/usuario-servico';

@Component({
  selector: "cad-aloc",
  templateUrl: "./cad-aloc-comp.html",
  styleUrls: ["./cad-aloc-comp.css"]
})

export class CadAlocComp implements OnInit {

  public veiculo: Veiculo;
  public usuario: Usuario;
  public alocacao: Alocacao;
  public hoje: Date;
  public dtfinal: Date;
  public Total: number;

  public ativar_spinner: boolean;
  public msgErro: string;


  constructor(private alocacaoserv: AlocacaoServico, private usuarioServico: UsuarioServico,
    private notificacao: NotificacaoServico, private veiculoserv: VeiculoServico,
    private router: Router) {

  }

  ngOnInit(): void {
    this.usuario = this.usuarioServico.Usuario;
    var veiculoAlocacao = sessionStorage.getItem("veicAlocacao");

    if (veiculoAlocacao) {
      this.veiculo = JSON.parse(veiculoAlocacao);
      this.hoje = new Date();
      //this.dtfinal = new Date();
      this.Total = 0;

      console.log(this.veiculo);
    }
  }





  calcularTotal() {

    var data = (document.getElementById("dtfim") as HTMLInputElement).value;

    this.dtfinal = new Date(data);

    const diff = this.dtfinal.getTime() - Math.abs(this.hoje.getTime())
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (dias < 0 || data == "") {
      this.Total = 0;
    }
    else {

      if (dias == 0) {
        this.Total = this.veiculo.douPreco;
      }
      else {
        console.log(this.veiculo.douPreco);
        console.log(dias);
        this.Total = this.veiculo.douPreco * dias;
      }
    }
  }



  public realizaAlocacao() {
    this.ativar_spinner = true;

    let alocacao = new Alocacao();

    alocacao.UsuarioId = this.usuario.idUser;
    alocacao.veiculoId = this.veiculo.idVeiculo;
    alocacao.dtInicio = this.hoje;
    alocacao.dtFim = this.dtfinal;

    console.log(this.veiculo);
    this.veiculo.booALOCADO = true

    this.alocacaoserv.cadastroAlocacao(alocacao).subscribe(
      veicAloc => {
        console.log(alocacao);


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
    sessionStorage.setItem("veicAlocacao", "");
    this.router.navigate(['/pesq-veic-aloc']);
  }

}
