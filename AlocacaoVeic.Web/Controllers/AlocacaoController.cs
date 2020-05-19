using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AlocacaoVeic.Web.Controllers
{
    [Route("api/[controller]")]
    public class AlocacaoController : Controller
    {

        private readonly IAlocacaoRepos _alocacaoRepos;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;

        private Alocacao alocacao;
        private List<string> msgValidacao;

        public AlocacaoController(IAlocacaoRepos alocacaoRepos,
                                  IHttpContextAccessor httpContextAccessor,
                                  IHostingEnvironment hostingEnvironment)
        {
            _alocacaoRepos = alocacaoRepos;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            msgValidacao = new List<string>();

            alocacao = new Alocacao();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                //alocacao.Veiculo.strModelo

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
                msgValidacao.Clear();

                if (alocacao.dtFim == null)
                    msgValidacao.Add("Informe a data final de alocação!");

                
                if (msgValidacao.Any())
                {
                    return BadRequest(msgValidacao);
                }



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
