import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Veiculo } from '../../modelo/veiculo';
import { VeiculoServico } from '../../servico/veiculo-servico';
 

@Component({
  selector: "pesq-veic",
  templateUrl: "./pesq-veic-comp.html",
  styleUrls: ["./pesq-veic-comp.css"]
})

export class PesqVeicComp implements OnInit {

  public veiculos: Veiculo[];

  constructor(private veiculoserv: VeiculoServico, private router: Router) {
    this.veiculoserv.listarVeiculos().subscribe(
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

  public adicionaVeiculo() {
    this.router.navigate(['/cad-veic'])
  }

  public editarVeiculo(veiculo: Veiculo) {
    sessionStorage.setItem('veicSession', JSON.stringify(veiculo))
    this.router.navigate(['/cad-veic'])
  }

  public deletarVeiculo(veiculo: Veiculo) {
    sessionStorage.setItem('veicDelSession', JSON.stringify(veiculo))
    this.router.navigate(['/cad-veic'])
  }
}
