using AlocacaoVeic.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;

namespace AlocacaoVeic.Repositorio.Contexto
{
    public class AlocacaoContext : DbContext
    {
        public AlocacaoContext (DbContextOptions<AlocacaoContext> options): base(options)
        {          
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Veiculo> Veiculos { get; set; }
        public DbSet<Alocacao> Alocacoes { get; set; }
    }
}
