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
            var oferta = await _repositorio.BuscarPorID (id);
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
        [Authorize (Roles = "Vendedor")]
        [Authorize (Roles = "Administrador")]
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

                await _repositorio.Salvar (oferta);
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
<<<<<<< HEAD
        [Authorize (Roles = "Vendedor")]
        [Authorize (Roles = "Administrador")]
=======
        [Authorize(Roles ="2")]
        [Authorize(Roles ="1")]
>>>>>>> defad8c9774a6ac01c11beac2ce26648ef1fc13c
        [HttpPut ("{id}")]
        public async Task<ActionResult<Oferta>> Put (int id, [FromForm] Oferta oferta) {
            if (id != oferta.IdOferta) {
                return BadRequest ();
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

                await _repositorio.Alterar (oferta);
            } catch (DbUpdateConcurrencyException) {
                var oferta_valida = await _repositorio.BuscarPorID (id);
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
<<<<<<< HEAD
        [Authorize (Roles = "Vendedor")]
        [Authorize (Roles = "Administrador")]
=======
        [Authorize(Roles ="1")]
>>>>>>> defad8c9774a6ac01c11beac2ce26648ef1fc13c
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Oferta>> Delete (int id) {
            var oferta = await _repositorio.BuscarPorID (id);
            if (oferta == null) {
                return NotFound ();
            }
            await _repositorio.Excluir (oferta);
            return oferta;
        }

        [HttpGet("FiltrarPorNome")]
        public ActionResult<List<Oferta>> GetFiltrar (FiltroViewModel filtro){

            List<Oferta> oferta_filtrar = _repositorio.FiltrarPorNome(filtro);
            
            return oferta_filtrar;
        }

        [HttpGet("Ordenar")]
        public ActionResult<List<Oferta>> GetOrdenar (){
             
            List<Oferta> oferta_ordenar = _repositorio.Ordenar();

            return oferta_ordenar;
        }
    }
}