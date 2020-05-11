import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginUsrComp } from './usuario/login/login-usr-comp';
import { CadUsrComp } from './usuario/cadastro/cad-usr-comp';
import { PesqUsrComp } from './usuario/pesquisa/pesq-usr-comp';
import { PesqVeicComp } from './veiculo/pesquisa/pesq-veic-comp';
import { CadVeicComp } from './veiculo/cadastro/cad-veic-comp';
import { CadAlocComp } from './alocacao/alocacao/cad-aloc-comp';
import { PesqAlocComp } from './alocacao/pesquisa/pesq-aloc-comp';
import { UsuarioServico } from './servico/usuario-servico';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginUsrComp,
    PesqUsrComp,
    CadUsrComp,
    PesqVeicComp,
    CadVeicComp,
    PesqAlocComp,
    CadAlocComp,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login-usr', component: LoginUsrComp },
      { path: 'pesq-usr', component: PesqUsrComp },
      { path: 'cad-usr', component: CadUsrComp },
      { path: 'pesq-veic', component: PesqVeicComp },
      { path: 'cad-veic', component: CadVeicComp },
      { path: 'pesq-aloc', component: PesqAlocComp },
      { path: 'cad-aloc', component: CadAlocComp}, 
    ])
  ],
  providers: [UsuarioServico],
  bootstrap: [AppComponent]
})
export class AppModule { }
