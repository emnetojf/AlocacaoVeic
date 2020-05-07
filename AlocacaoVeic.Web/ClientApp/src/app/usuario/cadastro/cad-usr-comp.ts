import { Component, OnInit } from "@angular/core";
import { UsuarioServico } from "../../servico/usuario-servico";
import { Router } from "@angular/router";
import { Usuario } from "../../modelo/usuario";

@Component({
  selector: "cad-usr",
  templateUrl: "./cad-usr-comp.html",
  styleUrls: ["./cad-usr-comp.css"]
})

export class CadUsrComp implements OnInit {

  public usuario: Usuario;
  public usrCad: boolean;
  public msgerro: string;

  constructor(private usuarioserv: UsuarioServico, private router: Router) {

  }


  ngOnInit(): void {
    var usrSession = sessionStorage.getItem('usrSession');
    if (usrSession) {
      this.usuario = JSON.parse(usrSession);
    }
    else {
      this.usuario = new Usuario()
    }
  }

  public cadastrarUsuario() {
    this.usuarioserv.cadastrarUsuario(this.usuario).subscribe(
      usrJson => {
        this.usrCad = true;
        this.msgerro = "";
        sessionStorage.setItem('usrSession', "");
        this.router.navigate(['/pesq-usr'])
      },
      e => {
        console.log(e.error);
        this.msgerro = e.error;
      }
    );
  }

  public deletarUsuario() {
    this.usuarioserv.deletarUsuario(this.usuario).subscribe(
      usrJson => {        
        this.msgerro = "";
        sessionStorage.setItem('usrSession', "");
        this.router.navigate(['/pesq-usr'])
      },
      e => {
        console.log(e.error);
        this.msgerro = e.error;
      }
    );
  }


  public cancelarUsuario() {
    this.router.navigate(['/pesq-usr'])
  }

}
