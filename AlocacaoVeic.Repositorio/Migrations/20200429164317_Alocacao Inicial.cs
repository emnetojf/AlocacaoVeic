using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AlocacaoVeic.Repositorio.Migrations
{
    public partial class AlocacaoInicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    idCliente = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    strNmCliente = table.Column<string>(maxLength: 50, nullable: false),
                    strEmail = table.Column<string>(maxLength: 50, nullable: false),
                    enuSEXO = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.idCliente);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    idUser = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    strNmUsuario = table.Column<string>(maxLength: 50, nullable: false),
                    strEmail = table.Column<string>(maxLength: 50, nullable: false),
                    strSenha = table.Column<string>(maxLength: 400, nullable: false),
                    booADMIN = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.idUser);
                });

            migrationBuilder.CreateTable(
                name: "Veiculos",
                columns: table => new
                {
                    idVeiculo = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    strPlaca = table.Column<string>(maxLength: 50, nullable: false),
                    strModelo = table.Column<string>(maxLength: 400, nullable: false),
                    douPreco = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Veiculos", x => x.idVeiculo);
                });

            migrationBuilder.CreateTable(
                name: "Alocacoes",
                columns: table => new
                {
                    idAlocacao = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    dtInicio = table.Column<DateTime>(nullable: false),
                    dtFim = table.Column<DateTime>(nullable: false),
                    ClienteID = table.Column<int>(nullable: false),
                    VeiculoID = table.Column<int>(nullable: false),
                    UserID = table.Column<int>(nullable: false),
                    UsuarioidUser = table.Column<int>(nullable: true),
                    PagtoID = table.Column<int>(nullable: false),
                    FormaPagto = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alocacoes", x => x.idAlocacao);
                    table.ForeignKey(
                        name: "FK_Alocacoes_Clientes_ClienteID",
                        column: x => x.ClienteID,
                        principalTable: "Clientes",
                        principalColumn: "idCliente",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Alocacoes_Usuarios_UsuarioidUser",
                        column: x => x.UsuarioidUser,
                        principalTable: "Usuarios",
                        principalColumn: "idUser",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Alocacoes_Veiculos_VeiculoID",
                        column: x => x.VeiculoID,
                        principalTable: "Veiculos",
                        principalColumn: "idVeiculo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alocacoes_ClienteID",
                table: "Alocacoes",
                column: "ClienteID");

            migrationBuilder.CreateIndex(
                name: "IX_Alocacoes_UsuarioidUser",
                table: "Alocacoes",
                column: "UsuarioidUser");

            migrationBuilder.CreateIndex(
                name: "IX_Alocacoes_VeiculoID",
                table: "Alocacoes",
                column: "VeiculoID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alocacoes");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Veiculos");
        }
    }
}
