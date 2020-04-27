using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using AlocacaoVeic.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Text;

namespace AlocacaoVeic.Repositorio.Repositorios
{
    public class AlocacaoRepos : BaseRepositorio<Alocacao>, IAlocacaoRepos
    {
        public AlocacaoRepos(AlocacaoContext alocacaoContext) : base(alocacaoContext)
        {
        }
    }
}
