import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alocacao } from '../modelo/alocacao';
import { Observable, forkJoin } from 'rxjs';
import { Veiculo } from '../modelo/veiculo';

@Injectable({
  providedIn: 'root'
})

export class AlocacaoServico {
  private baseURL: string;
  private aloc: Alocacao; 

  constructor(private http: HttpClient, @Inject('BASE_URL') baseURL: string) {
    this.baseURL = baseURL;    
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public cadastroAlocacao(alocacao: Alocacao): Observable<Alocacao> {
    return this.http.post<Alocacao>(this.baseURL + 'api/alocacao', JSON.stringify(alocacao), { headers: this.headers })
  }

  public deleteAlocacao(alocacao: Alocacao): Observable<Alocacao[]> {
    return this.http.post<Alocacao[]>(this.baseURL + 'api/alocacao/deletar', JSON.stringify(alocacao), { headers: this.headers })
  }

  public listaAlocacoes(): Observable<Alocacao[]> {
    return this.http.get<Alocacao[]>(this.baseURL + 'api/alocacao/');
  }

}
