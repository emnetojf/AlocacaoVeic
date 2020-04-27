using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using AlocacaoVeic.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AlocacaoVeic.Repositorio.Repositorios
{
    public class UsuarioRepos : BaseRepositorio<Usuario>, IUsuarioRepos
    {
        public UsuarioRepos(AlocacaoContext alocacaoContext) : base(alocacaoContext)
        {
        }

        public Usuario ListUser(string strEmail, string strSenha)
        {
            return _alocacaoContext.Usuarios.FirstOrDefault(usr => usr.strEmail == strEmail && usr.strSenha == strSenha);
        }

        public Usuario ListUser(string strEmail)
        {
            return _alocacaoContext.Usuarios.FirstOrDefault(usr => usr.strEmail == strEmail);
        }
    }
}
