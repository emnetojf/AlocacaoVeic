using Microsoft.EntityFrameworkCore.Migrations;

namespace AlocacaoVeic.Repositorio.Migrations
{
    public partial class AlocacaoUsuarioIdVeiculoId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alocacoes_Usuarios_UsuarioID",
                table: "Alocacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Alocacoes_Veiculos_VeiculoID",
                table: "Alocacoes");

            migrationBuilder.RenameColumn(
                name: "VeiculoID",
                table: "Alocacoes",
                newName: "VeiculoId");

            migrationBuilder.RenameColumn(
                name: "UsuarioID",
                table: "Alocacoes",
                newName: "UsuarioId");

            migrationBuilder.RenameColumn(
                name: "PagtoID",
                table: "Alocacoes",
                newName: "PagtoId");

            migrationBuilder.RenameIndex(
                name: "IX_Alocacoes_VeiculoID",
                table: "Alocacoes",
                newName: "IX_Alocacoes_VeiculoId");

            migrationBuilder.RenameIndex(
                name: "IX_Alocacoes_UsuarioID",
                table: "Alocacoes",
                newName: "IX_Alocacoes_UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Alocacoes_Usuarios_UsuarioId",
                table: "Alocacoes",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "idUser",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Alocacoes_Veiculos_VeiculoId",
                table: "Alocacoes",
                column: "VeiculoId",
                principalTable: "Veiculos",
                principalColumn: "idVeiculo",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alocacoes_Usuarios_UsuarioId",
                table: "Alocacoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Alocacoes_Veiculos_VeiculoId",
                table: "Alocacoes");

            migrationBuilder.RenameColumn(
                name: "VeiculoId",
                table: "Alocacoes",
                newName: "VeiculoID");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Alocacoes",
                newName: "UsuarioID");

            migrationBuilder.RenameColumn(
                name: "PagtoId",
                table: "Alocacoes",
                newName: "PagtoID");

            migrationBuilder.RenameIndex(
                name: "IX_Alocacoes_VeiculoId",
                table: "Alocacoes",
                newName: "IX_Alocacoes_VeiculoID");

            migrationBuilder.RenameIndex(
                name: "IX_Alocacoes_UsuarioId",
                table: "Alocacoes",
                newName: "IX_Alocacoes_UsuarioID");

            migrationBuilder.AddForeignKey(
                name: "FK_Alocacoes_Usuarios_UsuarioID",
                table: "Alocacoes",
                column: "UsuarioID",
                principalTable: "Usuarios",
                principalColumn: "idUser",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Alocacoes_Veiculos_VeiculoID",
                table: "Alocacoes",
                column: "VeiculoID",
                principalTable: "Veiculos",
                principalColumn: "idVeiculo",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
