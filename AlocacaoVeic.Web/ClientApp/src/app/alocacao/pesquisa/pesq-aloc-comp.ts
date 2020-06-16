import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Alocacao } from '../../modelo/alocacao';
import { AlocacaoServico } from '../../servico/alocacao-servico';
import { Veiculo } from '../../modelo/veiculo';
import { VeiculoServico } from '../../servico/veiculo-servico';


@Component({
  selector: "pesq-aloc",
  templateUrl: "./pesq-aloc-comp.html",     
  styleUrls: ["./pesq-aloc-comp.css"]
})



export class PesqAlocComp implements OnInit {

  public alocacoes: Alocacao[];
  public veiculo: Veiculo;

  constructor(private alocacaoserv: AlocacaoServico, private veiculoserv: VeiculoServico, private router: Router) {

    this.alocacaoserv.listaAlocacoes().subscribe(
      alocacoes => {
        this.alocacoes = alocacoes;
        
      },
      e => {
        console.log(e.error);
      }
    )

    //for (let aloc of this.alocacoes) {

    //  this.veiculoserv.listaVeiculo(aloc.VeiculoId).subscribe(
    //    veic => {
    //      this.veiculo = veic;          
    //    }
    //  )      

    //}    
    
  }

  ngOnInit(): void {

  }

  public adicionaAlocacao() {
    this.router.navigate(["/pesq-veic-aloc"])
  }

  public editarAlocacao(alocacao: Alocacao) {
    sessionStorage.setItem("editAlocacao", JSON.stringify(alocacao))
    this.router.navigate(["/edit-aloc"])
  }

  public deletarAlocacao(alocacao: Alocacao) {
    sessionStorage.setItem("delAlocacao", JSON.stringify(alocacao))
    this.router.navigate(["/del-aloc"])
  }
}
