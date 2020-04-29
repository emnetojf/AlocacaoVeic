using AlocacaoVeic.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AlocacaoVeic.Repositorio.config
{
    class AlocacaoConfig : IEntityTypeConfiguration<Alocacao>
    {
        public void Configure(EntityTypeBuilder<Alocacao> builder)
        {
            builder.HasKey(aloc => aloc.idAlocacao);

            builder.Property(aloc => aloc.ClienteID);
            builder.Property(aloc => aloc.UserID).IsRequired();
            builder.Property(aloc => aloc.VeiculoID).IsRequired();
            builder.Property(aloc => aloc.dtInicio).IsRequired();
            builder.Property(aloc => aloc.dtFim).IsRequired();
        }
    }
}
