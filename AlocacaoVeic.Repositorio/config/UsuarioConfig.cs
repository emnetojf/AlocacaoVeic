using AlocacaoVeic.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace AlocacaoVeic.Repositorio.config
{
    public class UsuarioConfig :IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasKey(usr => usr.idUser);

            builder.Property(usr => usr.strNmUsuario).IsRequired().HasMaxLength(50);
            builder.Property(usr => usr.strEmail).IsRequired().HasMaxLength(50);
            builder.Property(usr => usr.strSenha).IsRequired().HasMaxLength(400);

            builder.HasMany(usr => usr.Alocacoes).WithOne(aloc => aloc.Usuario); 

        }
    }
}
