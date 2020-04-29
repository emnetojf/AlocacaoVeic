using AlocacaoVeic.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AlocacaoVeic.Repositorio.config
{
    public class ClienteConfig : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.HasKey(cli => cli.idCliente);

            builder.Property(cli => cli.strNmCliente).IsRequired().HasMaxLength(50);
            builder.Property(cli => cli.strEmail).IsRequired().HasMaxLength(50);            

        }
    }
}
