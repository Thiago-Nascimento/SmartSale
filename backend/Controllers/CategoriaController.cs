using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domains;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase {
        CategoriaRepository _repositorio = new CategoriaRepository ();

        /// <summary>
        /// Lista as Categorias
        /// </summary>
        /// <returns>Lista contendo as Categorias</returns>
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get () {
            var categorias = await _repositorio.Listar ();
            if (categorias == null) {
                return NotFound ();
            }
            return categorias;
        }

    
        /// <summary>
        /// Exibe uma Categoria Especifica
        /// </summary>
        /// <param name="id">int Id da categoria desejada</param>
        /// <returns>Categoria Requisitada</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Categoria>> Get (int id) {
            var categoria = await _repositorio.BuscarPorID (id);
            if (categoria == null) {
                return NotFound ();
            }
            return categoria;
        }

        /// <summary>
        /// Adiciona uma Categoria
        /// </summary>
        /// <param name="categoria">string nome da categoria</param>
        /// <returns>Categoria cadastrada</returns>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Categoria>> Post (Categoria categoria) {
            try {
                await _repositorio.Salvar (categoria);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }

            return categoria;
        }

        /// <summary>
        /// Faz a modificação de derterminada categoria
        /// </summary>
        /// <param name="id"> int id da categoria</param>
        /// <param name="categoria">string nome da categoria</param>
        /// <returns>Categoria Modificada</returns>
        [Authorize]
        [HttpPut ("{id}")]
        public async Task<ActionResult<Categoria>> Put (int id, Categoria categoria) {
            if (id != categoria.IdCategoria) {
                return BadRequest ();
            }

            try {
                await _repositorio.Alterar (categoria);
            } catch (DbUpdateConcurrencyException) {

                var categoria_valida = await _repositorio.BuscarPorID (id);
                if (categoria_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }

            }
            return categoria;
        }

        /// <summary>
        /// Delete a categoria especificada
        /// </summary>
        /// <param name="id">int id da categoria</param>
        /// <returns>Categoria deletada</returns>
        [Authorize]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Categoria>> Delete (int id) {
            var categoria = await _repositorio.BuscarPorID (id);
            if (categoria == null) {
                return NotFound ();
            }
            await _repositorio.Excluir (categoria);
            return categoria;
        }

        //api/Categoria/FiltroPorNome
        /// <summary>
        /// filtra as categorias por nome
        /// </summary>
        /// <param name="FiltroPorNome"></param>
        /// <returns>Categoria Requisitada</returns>
        [HttpGet ("FiltroPorNome")]
        public ActionResult<List<Categoria>> GetFiltro (FiltroViewModel FiltroPorNome) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                List<Categoria> categorias = _contexto.Categoria.Where (cat => cat.NomeCategoria.StartsWith(FiltroPorNome.filtro)).ToList();

                return categorias;
            }
        }


        //api/Categoria/FiltroPorNome
        //
        [HttpGet ("Ordenar")]
        public ActionResult<List<Categoria>> GetOrdenar () {

            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                List<Categoria> categorias = _contexto.Categoria.OrderByDescending (cat => cat.NomeCategoria).ToList();

                return categorias;
            }
        }
    }
}