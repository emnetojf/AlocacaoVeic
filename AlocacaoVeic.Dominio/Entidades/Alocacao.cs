using AlocacaoVeic.Dominio.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Alocacao
    {
        public int idAlocacao { get; set; }

        public int UsuarioID { get; set; }
        public virtual Usuario Usuario { get; set; }

        public int VeiculoID { get; set; }
        public virtual Veiculo Veiculo { get; set; }

        [Required(ErrorMessage = "Informe a data ínicio da alocação do veículo!")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [DataType(DataType.Date)]
        public DateTime dtInicio { get; set; }

        [Required(ErrorMessage = "Informe a data fim da alocação do veículo!")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [DataType(DataType.Date)]
        public DateTime dtFim { get; set; }

        public int PagtoID { get; set; }
        public virtual FormaPagto FormaPagto { get; set; }
                
    }
}
