using AlocacaoVeic.Dominio.Enum;
using System;
using System.Collections.Generic;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Usuario
    {
        public int idUser { get; set; }
        public string  strNmUsuario { get; set; }
        public string strEmail { get; set; }        
        public string strSenha { get; set; }
        public bool booADMIN { get; set; }

        public virtual ICollection<Alocacao> Alocacoes { get; set; }
    }
}
