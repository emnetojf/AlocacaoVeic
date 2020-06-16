import { Veiculo } from "./veiculo";
import { Usuario } from "./usuario";

export class Alocacao {
  idAlocacao: number;
  UsuarioId: number;
  Usuario: Usuario;
  veiculoId: number;
  Veiculo: Veiculo;
  dtInicio: Date;
  dtFim: Date;
  PagtoID: number;
}
