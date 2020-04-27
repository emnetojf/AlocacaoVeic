using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using AlocacaoVeic.Repositorio.Contexto;

namespace AlocacaoVeic.Repositorio.Repositorios
{
    public class VeiculoRepos : BaseRepositorio<Veiculo>, IVeiculoRepos
    {
        public VeiculoRepos(AlocacaoContext alocacaoContext) : base(alocacaoContext)
    {
    }
}
}
