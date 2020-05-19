﻿using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using AlocacaoVeic.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AlocacaoVeic.Repositorio.Repositorios
{
    public class AlocacaoRepos : BaseRepositorio<Alocacao>, IAlocacaoRepos
    {
        public AlocacaoRepos(AlocacaoContext alocacaoContext) : base(alocacaoContext)
        {

        }

        public IEnumerable<Alocacao> listaAlocacoes()
        {
            return _alocacaoContext.Alocacoes
                                        .Include(a => a.Usuario)
                                        .Include(a => a.Veiculo)
                                        .ToList();
        }
    }
}
