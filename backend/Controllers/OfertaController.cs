using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase {
        OfertaRepository _repositorio = new OfertaRepository();
        UploadRepository _uploadRepo = new UploadRepository();

        /// <summary>
        /// Lista as ofertas cadastradas
        /// </summary>
        /// <returns>Lista de ofertas</returns>
        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get () {
            var ofertas = await _repositorio.Listar();
            if (ofertas == null) {
                return NotFound ();
            }
            return ofertas;
        }

        /// <summary>
        /// Exibe uma oferta específica
        /// </summary>
        /// <param name="id">int Id da oferta desejada</param>
        /// <returns>Oferta requisitada</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Oferta>> Get (int id) {
            var oferta = await _repositorio.BuscarPorID(id);
            if (oferta == null) {
                return NotFound ();
            }
            return oferta;
        }

        /// <summary>
        /// Adiciona uma oferta
        /// </summary>
        /// <param name="oferta">string nome da oferta</param>
        /// <returns>Oferta cadastrada</returns>
        // [Authorize]
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post ([FromForm]Oferta oferta) {
            try {
                var arquivo = Request.Form.Files[0];

                oferta.Quantidade = int.Parse(Request.Form["quantidade"]);
                oferta.Foto = _uploadRepo.Upload(arquivo, "imgOferta");
                oferta.Cor = Request.Form["cor"].ToString();
                oferta.Preco = double.Parse(Request.Form["preco"]);
                oferta.Descricao = Request.Form["descricao"].ToString();
                oferta.DataValidade = DateTime.Parse(Request.Form["dataValidade"]);
                oferta.IdProduto = int.Parse(Request.Form["idProduto"]);
                oferta.IdUsuario = int.Parse(Request.Form["idUsuario"]);
                                
                await _repositorio.Salvar(oferta);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return oferta;
        }

        /// <summary>
        /// Faz a modificação de derterminada oferta
        /// </summary>
        /// <param name="id"> int id da oferta</param>
        /// <param name="oferta">string nome da oferta</param>
        /// <returns>Oferta Modificada</returns>
        [Authorize]
        [HttpPut ("{id}")]
        public async Task<ActionResult<Oferta>> Put (int id, [FromForm]Oferta oferta) {
            if (id != oferta.IdOferta) {
                return BadRequest ();
            }
            try {
                var arquivo = Request.Form.Files[0];

                oferta.Quantidade = int.Parse(Request.Form["quantidade"]);
                oferta.Foto = _uploadRepo.Upload(arquivo, "imgOferta");
                oferta.Cor = Request.Form["cor"].ToString();
                oferta.Preco = double.Parse(Request.Form["preco"]);
                oferta.Descricao = Request.Form["descricao"].ToString();
                oferta.DataValidade = DateTime.Parse(Request.Form["dataValidade"]);
                oferta.IdProduto = int.Parse(Request.Form["idProduto"]);
                oferta.IdUsuario = int.Parse(Request.Form["idUsuario"]);
                
                await _repositorio.Alterar(oferta);
            } catch (DbUpdateConcurrencyException) {
                var oferta_valida = await _repositorio.BuscarPorID(id);
                if (oferta_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            return oferta;
        }

        /// <summary>
        /// Delete a oferta específicada
        /// </summary>
        /// <param name="id">int id da oferta</param>
        /// <returns>Oferta deletada</returns>
        [Authorize]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Oferta>> Delete (int id) {
            var oferta = await _repositorio.BuscarPorID(id);
            if (oferta == null) {
                return NotFound ();
            }
            await _repositorio.Excluir(oferta);
            return oferta;
        }

        // public ActionResult Index (string sortOrder) {
        //     NameSortParm = String.IsNullOrEmpty (sortOrder) ? "NomeProduto" : "";
        //     DateSortParm = sortOrder == "Date" ? "date" : "Date";
        //     var produtos = from p in BD_SmartSaleContext.Produto
        //     select p;
        //     switch (sortOrder) {
        //         case "NomeProduto":
        //             produtos = produtos.OrderByDescending (p => p.NomeProduto);
        //             break;
        //         case "Date":
        //             produtos = produtos.OrderBy (p => p.EnrollmentDate);
        //             break;
        //         case "date_desc":
        //             produtos = produtos.OrderByDescending (p => p.EnrollmentDate);
        //             break;
        //         default:
        //             produtos = produtos.OrderBy (p => p.LastName);
        //             break;
        //     }
        //     return produtos.ToList ();
        // }
    }
}