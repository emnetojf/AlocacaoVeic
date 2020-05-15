import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veiculo } from '../../modelo/veiculo';
import { DatePipe } from '@angular/common';
import { Alocacao } from '../../modelo/alocacao';

@Component({
  selector: "cad-aloc",
  templateUrl: "./cad-aloc-comp.html",
  styleUrls: ["./cad-aloc-comp.css"]
})

export class CadAlocComp implements OnInit {

  public veiculo: Veiculo;
  public alocacao = new Alocacao();
  public hoje;
  public Total;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    var veiculoAlocacao = sessionStorage.getItem("veicAlocacao");

    if (veiculoAlocacao) {
      this.veiculo = JSON.parse(veiculoAlocacao);
      this.hoje = new Date();
      this.Total = 0;
    }
  }

  calcularTotal() {

    var data = (document.getElementById("dtfim") as HTMLInputElement).value;
        
    const dtfinal = new Date(data);

    const diff = dtfinal.getTime() - Math.abs(this.hoje.getTime())
    const dias =  Math.ceil(diff / (1000 * 60 * 60 * 24));
    this.Total = this.veiculo.douPreco * dias;    
  }



  public cancelarVeiculo() {
    sessionStorage.setItem("veicAlocacao", "");
    this.router.navigate(['/pesq-veic-aloc']);
  }
}
