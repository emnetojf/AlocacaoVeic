using AlocacaoVeic.Dominio.Enum;
using System;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Alocacao
    {
        public int idAlocacao { get; set; }
        public int idCliente { get; set; }
        public int idVeiculo { get; set; }
        public int idUser { get; set; }
        public DateTime dtInicio { get; set; }
        public DateTime dtFim { get; set; }
        public FormaPagto FormaPagto { get; set; }
    }
}
