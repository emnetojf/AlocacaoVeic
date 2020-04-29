using AlocacaoVeic.Dominio.Enum;
using System;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Alocacao
    {
        public int idAlocacao { get; set; }

        public DateTime dtInicio { get; set; }
        public DateTime dtFim { get; set; }

        public int ClienteID { get; set; }
        public Cliente Cliente { get; set; }

        public int VeiculoID { get; set; }
        public Veiculo Veiculo { get; set; }

        public int UserID { get; set; }
        public Usuario Usuario { get; set; }

        public int PagtoID { get; set; }
        public FormaPagto FormaPagto { get; set; }

        
    }
}
