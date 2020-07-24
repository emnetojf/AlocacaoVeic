import { Component, OnInit } from "@angular/core";
import { UsuarioServico } from "../../servico/usuario-servico";
import { Router } from "@angular/router";
import { Usuario } from "../../modelo/usuario";
import { NotificacaoServico } from "../../servico/notificacao-servico";


@Component({
  selector: "cad-usr",
  templateUrl: "./cad-usr-comp.html",
  styleUrls: ["./cad-usr-comp.css"]
})

export class CadUsrComp implements OnInit {

  public usuario: Usuario;
  public usrUpdate: boolean;
  public usrDelete: boolean;
  public ativar_spinner: boolean; 
  public msgErro: string;

  constructor(private usuarioserv: UsuarioServico, private notificacao: NotificacaoServico, private router: Router) {

  }


  ngOnInit(): void {
    // verifica se é update
    var usrSession = sessionStorage.getItem('usrSession');
    if (usrSession) {
      this.usuario = JSON.parse(usrSession);
      this.usrUpdate = true;
      this.usrDelete = false
    }
    else {
      // verifica se é delete
      usrSession = sessionStorage.getItem('usrDelSession');
      if (usrSession) {
        this.usuario = JSON.parse(usrSession);
        this.usrUpdate = false;
        this.usrDelete = true
      }
      else {
        this.usuario = new Usuario()
        this.usrUpdate = false;
        this.usrDelete = false
      }
    }
  }

  public cadastrarUsuario() {
    this.ativar_spinner = true;


    this.usuarioserv.cadastrarUsuario(this.usuario).subscribe(
      usrJson => {
        this.msgErro = "";
        this.ativar_spinner = false;

        if (this.usrUpdate)
          this.notificacao.showSucesso("Usuário atualizado com sucesso!", "Sucesso")
        else
          this.notificacao.showSucesso("Usuário cadastrado com sucesso!", "Sucesso")
           
        this.usrUpdate = false;
        this.usrDelete = false;
        sessionStorage.setItem('usrSession', "");
        this.router.navigate(['/pesq-usr'])
      },
      e => {
        console.log(e.error);
        this.usrUpdate = false;
        this.usrDelete = false;
        this.ativar_spinner = false;
        this.msgErro = e.error;

        let msgPreenchimento = this.msgErro.substring(0, 7);

        if (msgPreenchimento === "Informe") {
          this.notificacao.showAtencao("Por favor preencha os campos!", "Atenção");
        } else {
          this.notificacao.showErro("Ocorreu um erro!", "Erro");
        }
        
      }
    );
  }

  public deletarUsuario() {
    this.ativar_spinner = true;
    this.usuarioserv.deletarUsuario(this.usuario).subscribe(
      usrJson => {
        this.notificacao.showAtencao("Usuário excluído com sucesso!", "Excluído")
        this.msgErro = "";
        this.usrUpdate = false;
        this.usrDelete = false;
        sessionStorage.setItem('usrDelSession', "");
        this.router.navigate(['/pesq-usr'])
      },
      e => {
        console.log(e.error);        
        this.usrUpdate = false;
        this.usrDelete = false;
        this.notificacao.showErro("Um erro ocorreu!", "Erro");
        this.msgErro = e.error;
      }
    );
  }


  public cancelarUsuario() {
    this.usrUpdate = false;
    this.usrDelete = false;
    sessionStorage.setItem('usrSession', "");
    sessionStorage.setItem('usrDelSession', "");
    this.router.navigate(['/pesq-usr'])
  }
  
}
