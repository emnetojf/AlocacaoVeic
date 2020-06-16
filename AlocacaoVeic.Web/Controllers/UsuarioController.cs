using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;

namespace AlocacaoVeic.Web.Controllers
{
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {

        private readonly IUsuarioRepos _usuarioRepos;
        //private IHttpContextAccessor _httpContextAccessor;
        //private IHostingEnvironment _hostingEnvironment;


        private List<string> msgValidacao;


        public UsuarioController(IUsuarioRepos usuarioRepos)
        {
            _usuarioRepos = usuarioRepos;
            msgValidacao = new List<string>();
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
                msgValidacao.Clear();

                if (string.IsNullOrEmpty(usuario.strNmUsuario))
                    msgValidacao.Add("Informe o Nome do usuário!");

                if (string.IsNullOrEmpty(usuario.strEmail))
                {
                    msgValidacao.Add("Informe o e-mail do usuário!");
                }

                if (string.IsNullOrEmpty(usuario.strSenha))
                {
                    msgValidacao.Add("Informe a senha do usuário!");
                }


                if (msgValidacao.Any())
                {
                    return BadRequest(string.Join(" - ", msgValidacao));
                }



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

        [HttpPost("VerificarUsuario")]
        public IActionResult VerificarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                msgValidacao.Clear();

                if (string.IsNullOrEmpty(usuario.strEmail))
                {
                    msgValidacao.Add("Informe o e-mail do usuário!");
                }

                if (string.IsNullOrEmpty(usuario.strSenha))
                {
                    msgValidacao.Add("Informe a senha do usuário!");
                }


                if (msgValidacao.Any())
                {
                    return BadRequest(string.Join(" - ", msgValidacao));
                }



                var usuarioRetorno = this._usuarioRepos.ListUser(usuario.strEmail, usuario.strSenha);

                if (usuarioRetorno != null)
                {
                    return Ok(usuarioRetorno);
                }

                return BadRequest("Usuário ou senha inválidos");
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }


    }
}
