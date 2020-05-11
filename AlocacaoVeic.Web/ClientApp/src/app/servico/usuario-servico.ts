import { Injectable, Inject, OnInit} from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { Usuario } from "../modelo/usuario";


@Injectable({
  providedIn: "root"
})

export class UsuarioServico implements OnInit {

  private baseUrl: string;
  private usuarios: Usuario[];
  private usuario: Usuario;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.usuarios = [];
    this.usuario = new Usuario();
  }

  // ******** Usuário Autenticado ********
  get getUsuario(): Usuario {
    let usuario_json = sessionStorage.getItem("usuario-autenticado");
    this.usuario = JSON.parse(usuario_json);
    return this.usuario;
  }

  set setUsuario(usuario: Usuario) {
    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
    this.usuario = usuario;
  }
  // ************************************


  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }


  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl + "api/usuario/", JSON.stringify(usuario), { headers: this.headers });
  }

  public salvarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl + "api/usuario/salvar", JSON.stringify(usuario), { headers: this.headers });
  }

  public deletarUsuario(usuario: Usuario): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(this.baseUrl + "api/usuario/deletar", JSON.stringify(usuario), { headers: this.headers });
  }

  public listarUsuario(usrID: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseUrl + "api/usuario/lista");
  }

  public listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl + "api/usuario");
  }

  public verificaUsuarios(usuario: Usuario): Observable<Usuario> {  
    return this.http.post<Usuario>(this.baseUrl + "api/usuario/VerificarUsuario", JSON.stringify(usuario), { headers: this.headers });
  }
  
}
