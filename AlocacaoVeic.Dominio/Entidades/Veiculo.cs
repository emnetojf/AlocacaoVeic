using System.Collections.Generic;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Veiculo
    {
        public int idVeiculo { get; set; }
        public string strPlaca { get; set; }
        public string strModelo { get; set; }
        public double douPreco { get; set; }

        public virtual ICollection<Alocacao> Alocacoes { get; set; }
    }
}
