using AlocacaoVeic.Dominio.Enum;
using System;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Usuario
    {
        public int idUser { get; set; }
        public string  strNmUsuario { get; set; }
        public string strEmail { get; set; }
        public Sexo enuSexo { get; set; }
        public string strSenha { get; set; }
        public Boolean booADMIN { get; set; }
    }
}
