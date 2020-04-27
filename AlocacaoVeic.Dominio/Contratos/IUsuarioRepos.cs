using AlocacaoVeic.Dominio.Entidades;


namespace AlocacaoVeic.Dominio.Contratos
{
    public interface IUsuarioRepos : IBaseRepos<Usuario>
    {
        Usuario ListUser(string strEmail, string strSenha);
        Usuario ListUser(string strEmail);
    }
}
