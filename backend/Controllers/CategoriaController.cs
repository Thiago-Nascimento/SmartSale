using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase {
        BD_SmartSaleContext _context = new BD_SmartSaleContext ();

        /// <summary>
        /// Lista as Categorias
        /// </summary>
        /// <returns>Lista contendo as Categorias</returns>
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get () {
            var categorias = await _context.Categoria.ToListAsync ();
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
            var categoria = await _context.Categoria.FindAsync (id);
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
        [HttpPost]
        public async Task<ActionResult<Categoria>> Post (Categoria categoria) {
            try {
                await _context.AddAsync (categoria);
                await _context.SaveChangesAsync ();
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
        [HttpPut ("{id}")]
        public async Task<ActionResult<Categoria>> Put (int id, Categoria categoria) {
            if (id != categoria.IdCategoria) {
                return BadRequest ();
            }
            _context.Entry (categoria).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var categoria_valida = await _context.Categoria.FindAsync (id);
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
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Categoria>> Delete (int id) {
            var categoria = await _context.Categoria.FindAsync (id);
            if (categoria == null) {
                return NotFound ();
            }
            _context.Categoria.Remove (categoria);
            await _context.SaveChangesAsync ();
            return categoria;
        }
    }
}