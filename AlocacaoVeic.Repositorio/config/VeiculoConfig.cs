using AlocacaoVeic.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AlocacaoVeic.Repositorio.config
{
    class VeiculoConfig : IEntityTypeConfiguration<Veiculo>
    {
        public void Configure(EntityTypeBuilder<Veiculo> builder)
        {
            builder.HasKey(veic => veic.idVeiculo);

            builder.Property(veic => veic.strModelo).IsRequired().HasMaxLength(400);
            builder.Property(veic => veic.strPlaca).IsRequired().HasMaxLength(50);
            builder.Property(veic => veic.douPreco).IsRequired().HasColumnType("float");

            builder.HasMany(veic => veic.Alocacoes).WithOne(aloc => aloc.Veiculo);
        }
    }
}
