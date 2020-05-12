import { Injectable, Inject, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Veiculo } from '../modelo/veiculo';
import { inject } from '@angular/core/testing';

@Injectable({
  providedIn: "root"
})

export class VeiculoServico implements OnInit {

  private baseUrl: string;
  private veiculo: Veiculo;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  ngOnInit(): void {
    this.veiculo = new Veiculo();     
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json') 
  }

  public cadastroVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.baseUrl + 'api/veiculo', JSON.stringify(veiculo), { headers: this.headers })
  }

  public deletarVeiculo(veiculo: Veiculo): Observable<Veiculo[]> {
    return this.http.post<Veiculo[]>(this.baseUrl + 'api/veiculo/deletar', JSON.stringify(veiculo), { headers: this.headers })
  }

  public listaVeiculo(idVeiculo: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(this.baseUrl + 'api/veiculo/lista')
  }

  public listarVeiculos(): Observable<Veiculo[]> {
    return this.http.get <Veiculo[]>(this.baseUrl + 'api/veiculo/')
  }

  public enviaArq(arqSelecionado: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("arqEnviado", arqSelecionado, arqSelecionado.name);
    return this.http.post<string>(this.baseUrl + 'api/veiculo/enviarArq', formData);
  }
}
