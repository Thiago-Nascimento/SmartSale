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
        OfertaRepository _repositorio = new OfertaRepository ();
        UploadRepository _uploadRepo = new UploadRepository ();

        /// <summary>
        /// Lista as ofertas cadastradas
        /// </summary>
        /// <returns>Lista de ofertas</returns>
        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get () {
            var ofertas = await _repositorio.Listar ();
            if (ofertas == null) {
                return NotFound ("Ofertas não encontradas");
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
            var oferta = await _repositorio.BuscarPorID (id);
            if (oferta == null) {
                return NotFound ("Oferta não encontrada");
            }
            return oferta;
        }

        /// <summary>
        /// Adiciona uma oferta
        /// </summary>
        /// <param name="oferta">string nome da oferta</param>
        /// <returns>Oferta cadastrada</returns>
        // [Authorize (Roles = "2,1")]
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post ([FromForm] Oferta oferta) {
            try {
                var arquivo = Request.Form.Files[0];

                oferta.Quantidade = int.Parse (Request.Form["quantidade"]);
                oferta.Foto = _uploadRepo.Upload (arquivo, "imgOferta");
                oferta.Cor = Request.Form["cor"].ToString ();
                oferta.Preco = double.Parse (Request.Form["preco"]);
                oferta.Descricao = Request.Form["descricao"].ToString ();
                oferta.DataValidade = DateTime.Parse (Request.Form["dataValidade"]);
                oferta.IdProduto = int.Parse (Request.Form["idProduto"]);
                oferta.IdUsuario = int.Parse (Request.Form["idUsuario"]);
                oferta.Titulo = Request.Form["titulo"].ToString();

                if(DateTime.Compare(oferta.DataValidade, DateTime.Now.Date) < 0) {
                    await _repositorio.Salvar (oferta);
                } else {
                    return BadRequest("Data de Validade Incorreta");
                }

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
        [Authorize (Roles = "2,1")]
        [HttpPut ("{id}")]
        public async Task<ActionResult<Oferta>> Put (int id, [FromForm] Oferta oferta) {
            if (id != oferta.IdOferta) {
                return BadRequest ("Oferta não encontrada");
            }
            try {
                var arquivo = Request.Form.Files[0];

                oferta.Quantidade = int.Parse (Request.Form["quantidade"]);
                oferta.Foto = _uploadRepo.Upload (arquivo, "imgOferta");
                oferta.Cor = Request.Form["cor"].ToString ();
                oferta.Preco = double.Parse (Request.Form["preco"]);
                oferta.Descricao = Request.Form["descricao"].ToString ();
                oferta.DataValidade = DateTime.Parse (Request.Form["dataValidade"]);
                oferta.IdProduto = int.Parse (Request.Form["idProduto"]);
                oferta.IdUsuario = int.Parse (Request.Form["idUsuario"]);
                oferta.Titulo = Request.Form["titulo"].ToString();

                await _repositorio.Alterar (oferta);
            } catch (DbUpdateConcurrencyException) {
                var oferta_valida = await _repositorio.BuscarPorID (id);
                if (oferta_valida == null) {
                    return NotFound ("Oferta não encontrada");
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
        [Authorize (Roles = "2,1")]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Oferta>> Delete (int id) {
            var oferta = await _repositorio.BuscarPorID (id);
            if (oferta == null) {
                return NotFound ("Oferta não encontrada");
            }
            try {
                await _repositorio.Excluir (oferta);
            } catch (System.Exception ex) {
                return BadRequest(new {
                    mensagem="Não foi possível excluir. Raw: " + ex
                });
            }
            return oferta;
        }

        /// <summary>
        /// Lista as ofertas com o Filtro
        /// </summary>
        /// <param name="filtro"></param>
        /// <returns>Lista contendo as Ofertas</returns>
        [HttpPost("FiltrarPorNome")]
        public ActionResult<List<Oferta>> PostFiltrar (FiltroViewModel filtro){

            List<Oferta> oferta_filtrar = _repositorio.FiltrarPorNome(filtro);
            
            return oferta_filtrar;
        }

        /// <summary>
        /// Lista as ofertas ordenadas
        /// </summary>
        /// <returns>Listas as ofertas</returns>
        [HttpGet("Ordenar")]
        public ActionResult<List<Oferta>> GetOrdenar (){
            
            List<Oferta> oferta_ordenar = _repositorio.Ordenar();

            return oferta_ordenar;
        }
    }
}