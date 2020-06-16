using AlocacaoVeic.Dominio.Contratos;
using AlocacaoVeic.Dominio.Entidades;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AlocacaoVeic.Web.Controllers
{
    [Route("api/[controller]")]
    public class VeiculoController : Controller
    {
        private readonly IVeiculoRepos _veiculoRepos;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;

        private List<string> msgValidacao;

        public VeiculoController(IVeiculoRepos veiculoRepos,
                                 IHttpContextAccessor httpContextAccessor,
                                 IHostingEnvironment hostingEnvironment)
        {
            _veiculoRepos = veiculoRepos;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;

            msgValidacao = new List<string>();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_veiculoRepos.ListAll());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
               return Json(_veiculoRepos.ListById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }



        [HttpPost]
        public IActionResult Post([FromBody] Veiculo veiculo)
        {
            try
            {
                msgValidacao.Clear();

                if (string.IsNullOrEmpty(veiculo.strPlaca))
                    msgValidacao.Add("Informe a placa do veículo!");

                if (string.IsNullOrEmpty(veiculo.strModelo))
                {
                    msgValidacao.Add("Informe o modelo do veículo!");
                }

                if (veiculo.douPreco == 0 )
                {
                    msgValidacao.Add("Informe o valor de alocação do veículo!");
                }


                if (msgValidacao.Any())
                {
                    return BadRequest(string.Join(" - ", msgValidacao));
                }


                if (veiculo.idVeiculo > 0)
                {
                    _veiculoRepos.Update(veiculo);
                }
                else
                {
                    _veiculoRepos.Create(veiculo);
                }


                return Created("api/veiculo", veiculo);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }


        [HttpPost("Deletar")]
        public IActionResult Deletar([FromBody] Veiculo veiculo)
        {
            try
            {
                _veiculoRepos.Remove(veiculo);

                return Json(_veiculoRepos.ListAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }


        [HttpPost("enviarArq")]
        public IActionResult enviarArq()
        {
            try
            {
                var FormFile = _httpContextAccessor.HttpContext.Request.Form.Files["arqEnviado"];
                var NomeArq = FormFile.FileName;
                var extArq = NomeArq.Split(".").Last();
                var NewNomeArq = GerarNovoNomeArq(NomeArq, extArq);

                var PastaArq = _hostingEnvironment.WebRootPath + "\\arquivos\\";
                var nomeCompleto = PastaArq + NewNomeArq;

                using (var streamArq = new FileStream(nomeCompleto, FileMode.Create))
                {
                    FormFile.CopyTo(streamArq);
                }

                return Json(NewNomeArq);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
            
        }


        private static string GerarNovoNomeArq(string nomeArq, string extArq)
        {
            var nomeCompacto = Path.GetFileNameWithoutExtension(nomeArq).Take(10).ToArray();
            var novoNomeArq = new string(nomeCompacto).Replace(" ", "-") + "." + extArq;
            novoNomeArq = $"{novoNomeArq}_{DateTime.Now.Day}-{DateTime.Now.Month}-{DateTime.Now.Year}-{DateTime.Now.Hour}{DateTime.Now.Minute}{DateTime.Now.Second}.{extArq}";
            return novoNomeArq;
        }

    }    
}
