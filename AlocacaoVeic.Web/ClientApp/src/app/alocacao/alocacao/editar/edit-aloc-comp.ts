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

      console.log(this.alocacao);

      let data = (document.getElementById("dtfim") as HTMLInputElement);
      data.value = this.alocacao.dtFim.toString().split('T')[0]

      this.Total = 0; 
      this.calcularTotal();



      //this.veiculoserv.listaVeiculo(this.alocacao.veiculoId).subscribe(
      //  veic => {
      //    //this.veiculo = veic;


      //    console.log(this.alocacao);
      //    console.log(this.veiculo);

      //    let data = (document.getElementById("dtfim") as HTMLInputElement);
      //    data.value = this.alocacao.dtFim.toString().split('T')[0] 

      //    this.Total = 0; 
      //    this.calcularTotal();
          

      //  },
      //  e => {
      //    console.log(e.error);
      //    this.ativar_spinner = false;
      //    this.msgErro = e.error;
      //    this.notificacao.showErro("Ocorreu um erro!", "Erro");
      //  }
      //);

           
    }
  }



  public calcularTotal() {

    var dtFim =  (document.getElementById("dtfim") as HTMLInputElement).value;

    this.dtfinal = new Date(dtFim);

    this.dtinicial = new Date(this.alocacao.dtInicio.toString())

    const diff = this.dtfinal.getTime() - Math.abs(this.dtinicial.getTime());
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (dias < 0 || dtFim == null) {
      this.Total = 0;
    }
    else {

      if (dias == 0) {
        this.Total = this.alocacao.Veiculo.douPreco; 
      }
      else {
        console.log(this.alocacao.Veiculo.douPreco); 
        console.log(dias);
        this.Total = this.alocacao.Veiculo.douPreco * dias;  
      }
    }
  }



  public realizaAlocacao() {
    this.ativar_spinner = true;

    let alocEdit = new Alocacao();

    alocEdit.idAlocacao = this.alocacao.idAlocacao;
    alocEdit.usuarioId = this.alocacao.usuarioId;
    alocEdit.veiculoId = this.alocacao.veiculoId;
    alocEdit.dtInicio = this.alocacao.dtInicio;
    alocEdit.dtFim = this.dtfinal;

    let veicEdit = new Veiculo()
    veicEdit = this.alocacao.Veiculo;
    veicEdit.booALOCADO = true
    
    this.alocacaoserv.cadastroAlocacao(alocEdit).subscribe(
      veicAloc => {

        console.log(veicAloc);

        this.veiculoserv.cadastroVeiculo(veicEdit).subscribe(
          veic => {
            this.msgErro = "";
            this.ativar_spinner = false;

            this.notificacao.showSucesso("Veículo alocado com sucesso", "Sucesso");

            sessionStorage.setItem("editAlocacao", "");
            this.router.navigate(['/pesq-aloc']);
          },
          e => {
            console.log(e.error);
            this.ativar_spinner = false;
            this.msgErro = e.error;
            this.notificacao.showErro("Ocorreu um erro!", "Erro");
          }
        );

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


























