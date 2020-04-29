using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AlocacaoVeic.Web.Controllers
{
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {

        private readonly IUsuarioRepos _usuarioRepos;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;

        public UsuarioController(IUsuarioRepos usuarioRepos)
        {
            _usuarioRepos = usuarioRepos;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_usuarioRepos.ListAll());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                if (usuario.idUser > 0)
                {
                    _usuarioRepos.Update(usuario);
                }
                else
                {
                    _usuarioRepos.Create(usuario);
                }


                return Created("api/usuario", usuario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }


        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] Usuario usuario)
        {
            try
            {
                _usuarioRepos.Remove(usuario);

                return Json(_usuarioRepos.ListAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

    }
}
