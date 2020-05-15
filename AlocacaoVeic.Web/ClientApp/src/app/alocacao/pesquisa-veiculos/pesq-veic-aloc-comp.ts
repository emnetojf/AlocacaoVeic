import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VeiculoServico } from '../../servico/veiculo-servico';
import { Veiculo } from '../../modelo/veiculo';

@Component({
  selector: "pesq-veic-aloc",
  templateUrl: "./pesq-veic-aloc-comp.html"  
})

export class PesqVeicAlocComp implements OnInit {

  public veiculos: Veiculo[];

  constructor(private veiculosserv: VeiculoServico, private router: Router) {
    this.veiculosserv.listarVeiculos().subscribe(
      veiculos => {
        this.veiculos = veiculos;
      },
      e => {
        console.log(e.error);
      }
    )
  }

  ngOnInit(): void {
    
  }

  public adicionaAlocacao(veiculo: Veiculo) {
    sessionStorage.setItem("veicAlocacao", JSON.stringify(veiculo))
    this.router.navigate(["/cad-aloc"])
  }

}
