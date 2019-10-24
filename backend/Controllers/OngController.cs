using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class OngController : ControllerBase {
        BD_SmartSaleContext _context = new BD_SmartSaleContext ();

        /// <summary>
        /// Lista as Ongs
        /// </summary>
        /// <returns>Lista contendo as Ongs</returns>
        [HttpGet]
        public async Task<ActionResult<List<Ong>>> Get () {
            var ongs = await _context.Ong.ToListAsync ();
            if (ongs == null) {
                return NotFound ();
            }
            return ongs;
        }

        /// <summary>
        /// Exibe uma Ong Especifica
        /// </summary>
        /// <param name="id">int Id da ong desejada</param>
        /// <returns>Ong Requisitada</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Ong>> Get (int id) {
            var ongs = await _context.Ong.Include("IdRegiaoNavigation").FirstOrDefaultAsync(e => e.IdOng == id);

            if (ongs == null) {
                return NotFound ();
            }
            return ongs;
        }

        /// <summary>
        /// Adiciona uma Ong
        /// </summary>
        /// <param name="ong">string nome da ong</param>
        /// <returns>Ong cadastrada</returns>
        [HttpPost]
        public async Task<ActionResult<Ong>> Post (Ong ong) {
            try {
                await _context.AddAsync (ong);
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }

            return ong;
        }

        /// <summary>
        /// Faz a modificação de derterminada ong
        /// </summary>
        /// <param name="id"> int id da ong</param>
        /// <param name="ong">string nome da ong</param>
        /// <returns>Ong Modificada</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult<Ong>> Put (int id, Ong ong) {
            if (id != ong.IdOng) {
                return BadRequest ();
            }
            _context.Entry (ong).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var ong_valida = await _context.Ong.FindAsync (id);
                if (ong_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }

            }
            return ong;
        }

        /// <summary>
        /// Delete a ong especificada
        /// </summary>
        /// <param name="id">int id da ong</param>
        /// <returns>Ong deletada</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Ong>> Delete (int id) {
            var ong = await _context.Ong.FindAsync (id);
            if (ong == null) {
                return NotFound ();
            }
            _context.Ong.Remove (ong);
            await _context.SaveChangesAsync ();
            return ong;
        }
    }
}