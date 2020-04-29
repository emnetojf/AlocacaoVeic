using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AlocacaoVeic.Web.Controllers
{
    [Route("api/[controller]")]
    public class AlocacaoController : Controller
    {

        private readonly IAlocacaoRepos _alocacaoRepos;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;

        public AlocacaoController(IAlocacaoRepos alocacaoRepos)
        {
            _alocacaoRepos = alocacaoRepos;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_alocacaoRepos.ListAll());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Alocacao alocacao)
        {
            try
            {
                if (alocacao.idAlocacao > 0)
                {
                    _alocacaoRepos.Update(alocacao);
                }
                else
                {
                    _alocacaoRepos.Create(alocacao);
                }


                return Created("api/alocacao", alocacao);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }


        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] Alocacao alocacao)
        {
            try
            {
                _alocacaoRepos.Remove(alocacao);

                return Json(_alocacaoRepos.ListAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

    }
}
