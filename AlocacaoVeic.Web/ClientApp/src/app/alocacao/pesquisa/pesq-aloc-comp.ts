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
  public veiculos: Veiculo[];


  constructor(private alocacaoserv: AlocacaoServico, private veiculoserv: VeiculoServico, private router: Router) {

    
    this.alocacaoserv.listaAlocacoes().subscribe(
      alocacoes => {
        this.alocacoes = alocacoes;

        //this.veiculoserv.listarVeiculos().subscribe(
        //  veiculos => {
        //    this.veiculos = veiculos;
        //  },
        //  e => {
        //    console.log(e.error);
        //  }
        //)


      },
      e => {
        console.log(e.error);
      }
    )    
  }

  ngOnInit(): void {

  }

  public adicionaAlocacao() {
    this.router.navigate(["/pesq-veic-aloc"])
  }

  public editarAlocacao(alocacao: Alocacao) {
    sessionStorage.setItem("veicAlocacao", JSON.stringify(alocacao))
    this.router.navigate(["/cad-aloc"])
  }

  public deletarAlocacao(alocacao: Alocacao) {
    sessionStorage.setItem("veicDelAlocacao", JSON.stringify(alocacao))
    this.router.navigate(["/cad-aloc"])
  }
}
