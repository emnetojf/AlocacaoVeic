import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioServico } from "../../servico/usuario-servico";
import { Usuario } from "../../modelo/usuario";


@Component({
  selector: "pesq-usr",
  templateUrl: "./pesq-usr-comp.html",
  styleUrls: ["./pesq-usr-comp.css"]
})

export class PesqUsrComp implements OnInit {

  public usuarios: Usuario[];


  constructor(private usuarioserv: UsuarioServico, private router: Router) {
    this.usuarioserv.listarUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
      e => {
        console.log(e.error);
      }
    );
  }

  ngOnInit(): void {

  }

  public adicionaUsuario() {
    this.router.navigate(['/cad-usr'])
  }

  public editarUsuario(usuario: Usuario) {
    sessionStorage.setItem('usrSession', JSON.stringify(usuario))
    this.router.navigate(['/cad-usr'])
  }

  public deletarUsuario(usuario: Usuario) {
    sessionStorage.setItem('usrDelSession', JSON.stringify(usuario))
    this.router.navigate(['/cad-usr'])
  }

}
