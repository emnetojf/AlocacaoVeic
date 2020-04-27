using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using AlocacaoVeic.Repositorio.Contexto;

namespace AlocacaoVeic.Repositorio.Repositorios
{
    public class ClienteRepos : BaseRepositorio<Cliente>, IClienteRepos
    {
        public ClienteRepos(AlocacaoContext alocacaoContext) : base(alocacaoContext)
        {
        }
    }
}
