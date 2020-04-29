using AlocacaoVeic.Dominio.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AlocacaoVeic.Dominio.Entidades
{
    public class Usuario
    {        
        public int idUser { get; set; }
        
        [Required(ErrorMessage = "Informe o nome do usuário!")]
        [StringLength(50, MinimumLength = 5, ErrorMessage = "{0} deve conter no míninmo {2} e máximo {1}!")]
        public string  strNmUsuario { get; set; }

        [Required(ErrorMessage = "Informe o email do usuário!")]
        [EmailAddress(ErrorMessage = "Informe um email válido")]
        public string strEmail { get; set; }

        [Required(ErrorMessage = "Informe {0} Usuário")]
        public string strSenha { get; set; }
        
        public bool booADMIN { get; set; }

        public virtual ICollection<Alocacao> Alocacoes { get; set; }
    }
}
