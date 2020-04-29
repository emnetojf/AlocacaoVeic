using AlocacaoVeic.Dominio.Entidades;
using AlocacaoVeic.Repositorio.config;
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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioConfig());
            modelBuilder.ApplyConfiguration(new VeiculoConfig());
            modelBuilder.ApplyConfiguration(new AlocacaoConfig());
            modelBuilder.ApplyConfiguration(new ClienteConfig());

            base.OnModelCreating(modelBuilder);
        }

    }    
}
