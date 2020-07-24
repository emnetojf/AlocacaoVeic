import { Component, OnInit } from '@angular/core'
import { Veiculo } from '../../modelo/veiculo';
import { VeiculoServico } from '../../servico/veiculo-servico';
import { NotificacaoServico } from '../../servico/notificacao-servico';
import { Router } from '@angular/router';

@Component({
  selector: "cad-veic",
  templateUrl: "./cad-veic-comp.html",
  styleUrls: ["./cad-veic-comp.css"]
})

export class CadVeicComp implements OnInit {

  public veiculo: Veiculo;
  public veicUpdate: boolean;
  public veicDelete: boolean;
  public ativar_spinner: boolean;
  public msgErro: string;
  public arqSelecionado: File;

  constructor(private veiculoserv: VeiculoServico, private notificacao: NotificacaoServico, private router: Router) {

  } 

  ngOnInit(): void {
    // verifica se é update
    var veicSession = sessionStorage.getItem('veicSession')

    if (veicSession) {
      this.veiculo = JSON.parse(veicSession);
      this.veicUpdate = true;
      this.veicDelete = false;
    }
    else {
      // verifica se é delete
      var veicDelSession = sessionStorage.getItem('veicDelSession')

      if (veicDelSession) {
        this.veiculo = JSON.parse(veicDelSession);
        this.veicUpdate = false;
        this.veicDelete = true;
      }
      else {
        this.veiculo = new Veiculo();
        this.veicUpdate = false;
        this.veicDelete = false;
      }
    }
  };


  public cadastrarVeiculo() {
    this.ativar_spinner = true;

    this.veiculoserv.cadastroVeiculo(this.veiculo).subscribe(
      veicJson => {
        this.msgErro = "";
        this.ativar_spinner = false;

        if (this.veicUpdate) {
          this.notificacao.showSucesso("Veículo atualizado com sucesso", "Sucesso");
        }
        else {
          this.notificacao.showSucesso("Veículo cadastrado com sucesso", "Sucesso");
        }

        this.veicUpdate = false;
        this.veicDelete = false;
        sessionStorage.setItem('veicSession', '');
        this.router.navigate(['/pesq-veic']);
      },
      e => {
        console.log(e.error);
        this.veicUpdate = false;
        this.veicDelete = false;
        this.ativar_spinner = false;
        this.msgErro = e.error;

        let msgPreenchimento = this.msgErro.substring(0, 7);

        if (msgPreenchimento === "Informe") {
          this.notificacao.showAtencao("Por favor preencha os campos!", "Atenção");
        } else {
          this.notificacao.showErro("Ocorreu um erro!", "Erro");
        }

      }
    )
  };


  public deletarVeiculo() {
    this.ativar_spinner = true;
    this.veiculoserv.deletarVeiculo(this.veiculo).subscribe(
      usrJson => {
        this.notificacao.showAtencao("Veículo excluído com sucesso!", "Excluído")
        this.msgErro = "";
        this.veicUpdate = false;
        this.veicDelete = false;
        sessionStorage.setItem('veicDelSession', "");
        this.router.navigate(['/pesq-veic'])
      },
      e => {
        console.log(e.error);
        this.veicUpdate = false;
        this.veicDelete = false;
        this.notificacao.showErro("Ocorreu um erro!", "Erro");
        this.msgErro = e.error;
      }
    );
  }


  public cancelarVeiculo() {
    this.veicUpdate = false;
    this.veicDelete = false;
    sessionStorage.setItem('veicSession', "");
    sessionStorage.setItem('veicDelSession', "");
    this.router.navigate(['/pesq-veic'])
  }

  public inputChange(files: FileList) {
    this.arqSelecionado = files.item(0);
    this.ativar_spinner = true;
    this.veiculoserv.enviaArq(this.arqSelecionado).subscribe(
      novoNomeArq => {
        this.veiculo.strNomeArq = novoNomeArq;
        console.log(novoNomeArq);
        this.ativar_spinner = false;
      },

      e => {
        console.log(e.error);
        this.notificacao.showErro("Ocorreu um erro!", "Erro");
        this.msgErro = e.error;
      }
    );
  }
}
