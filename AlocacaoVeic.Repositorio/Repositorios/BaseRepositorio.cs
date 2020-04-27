using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AlocacaoVeic.Repositorio.Repositorios
{
    public class BaseRepositorio<TEntity> : IBaseRepos<TEntity> where TEntity : class
    {
        protected readonly AlocacaoContext _alocacaoContext;

        public BaseRepositorio(AlocacaoContext alocacaoContext)
        {
            _alocacaoContext = alocacaoContext;
        }

        public void Create (TEntity entity)
        {
            _alocacaoContext.Set<TEntity>().Add(entity);
            _alocacaoContext.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            _alocacaoContext.Set<TEntity>().Update(entity);
            _alocacaoContext.SaveChanges();
        }

        public void Remove(TEntity entity)
        {
            _alocacaoContext.Set<TEntity>().Remove(entity);
            _alocacaoContext.SaveChanges();
        }


        public TEntity ListById(int id)
        {
            return _alocacaoContext.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> ListAll()
        {
            return _alocacaoContext.Set<TEntity>().ToList();
        }

        public void Dispose()
        {
            _alocacaoContext.Dispose();
        }
    }
}

