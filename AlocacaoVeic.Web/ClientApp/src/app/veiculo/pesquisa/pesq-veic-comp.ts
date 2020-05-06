import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
 

@Component({
  selector: "pesq-veic",
  templateUrl: "./pesq-veic-comp.html",
  styleUrls: ["./pesq-veic-comp.css"]
})

export class PesqVeicComp implements OnInit {
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public adicionaVeiculo() {
    this.router.navigate(['/cad-veic'])
  }
}
