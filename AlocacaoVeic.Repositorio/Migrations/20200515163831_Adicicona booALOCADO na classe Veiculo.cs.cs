using Microsoft.EntityFrameworkCore.Migrations;

namespace AlocacaoVeic.Repositorio.Migrations
{
    public partial class AdiciconabooALOCADOnaclasseVeiculocs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "booALOCADO",
                table: "Veiculos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "booALOCADO",
                table: "Veiculos");
        }
    }
}
