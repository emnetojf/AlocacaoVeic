using System;
using System.Collections.Generic;

namespace AlocacaoVeic.Dominio.Contratos
{
    public interface IBaseRepos<TEntity> : IDisposable where TEntity : class 
    {
        void Create (TEntity entity);
        void Update (TEntity entity);
        void Remove (TEntity entity);
        TEntity ListById(int id);
        IEnumerable<TEntity> ListAll();
    }
}
