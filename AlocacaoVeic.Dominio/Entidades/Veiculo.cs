using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Veiculo
    {
        public int idVeiculo { get; set; }

        [Required(ErrorMessage = "Informe a placa do veículo!")]
        [StringLength(50, MinimumLength = 5, ErrorMessage = "{0} deve conter no míninmo {2} e máximo {1}!")]
        public string strPlaca { get; set; }

        [Required(ErrorMessage = "Informe o veículo!")]
        [StringLength(50, MinimumLength = 5, ErrorMessage = "{0} deve conter no míninmo {2} e máximo {1}!")]
        public string strModelo { get; set; }

        [Required(ErrorMessage = "Informe o valor de aluguel do veículo")]
        [Range(100.0, 600.0, ErrorMessage = "{0} deve ser entre {1} e {2}")]
        [DisplayFormat(DataFormatString = "{0:F2}")]
        public double douPreco { get; set; }

        public string strNomeArq { get; set; }

        public bool booALOCADO { get; set; }

        public virtual ICollection<Alocacao> Alocacoes { get; set; } 
    }
}
