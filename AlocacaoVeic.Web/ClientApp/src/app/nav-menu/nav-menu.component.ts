import { Component } from '@angular/core';
import { UsuarioServico } from '../servico/usuario-servico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private usuarioserv: UsuarioServico, private router: Router) {

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


  public usuarioLogado(): boolean {
    return this.usuarioserv.usuarioAutenticado();
  }
  

  public sair() {
    this.usuarioserv.limparSessao();
    this.router.navigate(['/']);
  }

  get nomeUsuario() {
    return this.usuarioserv.Usuario.strNmUsuario;
  }
}
