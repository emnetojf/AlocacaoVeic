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
  public desabilitaBotao: boolean;


  constructor(private alocacaoserv: AlocacaoServico, private veiculoserv: VeiculoServico, private router: Router) {

    const hoje = new Date() //.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    
    this.alocacaoserv.listaAlocacoes().subscribe(
      alocacoes => {

        this.alocacoes = alocacoes;


        for (let aloc of this.alocacoes) {

          //this.desabilitaBotao = true;

          this.veiculoserv.listaVeiculo(aloc.veiculoId).subscribe(
            veicAloc => {

              aloc.Veiculo = veicAloc;

              const dtFim = aloc.dtFim.toString().split('T')[0]
              const dtFimFormat = new Date(dtFim);

              if (dtFimFormat.getTime() < hoje.getTime()) {

                aloc.Veiculo.booALOCADO = false;

                this.desabilitaBotao = true          

                this.veiculoserv.cadastroVeiculo(aloc.Veiculo).subscribe(
                  veicUpd => {

                  },
                  e => {
                    console.log(e.error);
                  }
                );

              }

            },
            e => {
              console.log(e.error);
            }
          );

        }

      },
      e => {
        console.log(e.error);
      }
    );

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
