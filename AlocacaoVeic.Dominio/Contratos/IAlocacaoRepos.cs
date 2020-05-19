using AlocacaoVeic.Dominio.Entidades;
using System.Collections.Generic;

namespace AlocacaoVeic.Dominio.Contratos
{
    public interface IAlocacaoRepos :IBaseRepos<Alocacao>
    {
        IEnumerable<Alocacao> listaAlocacoes();
    }
}
