import { Component, OnInit } from "@angular/core"
import { Usuario } from "../../modelo/usuario";
import { UsuarioServico } from "../../servico/usuario-servico";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "login-usr",
  templateUrl: "./login-usr-comp.html",
  styleUrls: ["./login-usr-comp.css"]
})

export class LoginUsrComp implements OnInit {

  public usuario: Usuario;  
  public ativar_spinner: boolean;
  public msgErro: string;
  public returnUrl: string;

  constructor(private usuarioserv: UsuarioServico, private router: Router, private activerouter: ActivatedRoute) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.returnUrl = this.activerouter.snapshot.queryParams['returnUrl']; 
  }

  public entrar() {
    this.ativar_spinner = true;
    this.usuarioserv.verificaUsuarios(this.usuario).subscribe(
      usrJson => {
        this.usuarioserv.Usuario = usrJson;

        if (this.returnUrl == null) {
          this.router.navigate(['/']);
        }
        else {
          this.router.navigate([this.returnUrl]);
        }
        this.ativar_spinner = false;
      },
      e => {
        console.log(e.error);
        this.msgErro = e.error;
        this.ativar_spinner = false;
      }
    )
  }
}
