import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Veiculo } from '../../modelo/veiculo';

@Component({
  selector: "pesq-aloc",
  templateUrl: "./pesq-aloc-comp.html",
  styleUrls: ["./pesq-aloc-comp.css"]
})

export class PesqAlocComp implements OnInit {

  public veiculos: Veiculo[];

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public adicionaAlocacao() {
    this.router.navigate(["/pesq-veic-aloc"])
  }

}
