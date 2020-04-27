using AlocacaoVeic.Dominio.Enum;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Cliente
    {
        public int idCliente { get; set; }
        public string strNmCliente { get; set; }
        public string strEmail { get; set; }
        public Sexo enuSEXO { get; set; }

    }
}
