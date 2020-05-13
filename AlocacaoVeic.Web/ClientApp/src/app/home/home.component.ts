import { Component } from '@angular/core';
import { UsuarioServico } from '../servico/usuario-servico';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private usuarioserv: UsuarioServico) {

  }

  public usuarioLogado(): boolean {
    return this.usuarioserv.usuarioAutenticado();
  }

  public usuarioAdmin(): boolean {
    return this.usuarioserv.usuarioAdmin();
  }
}
