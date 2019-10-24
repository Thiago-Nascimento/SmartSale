using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class RegiaoController : ControllerBase {
        BD_SmartSaleContext _context = new BD_SmartSaleContext ();

        /// <summary>
        /// Lista as Regiões
        /// </summary>
        /// <returns>Lista contendo as Regiões</returns>
        [HttpGet]
        public async Task<ActionResult<List<Regiao>>> Get () {
            var regioes = await _context.Regiao.ToListAsync ();
            if (regioes == null) {
                return NotFound ();
            }
            return regioes;
        }

        /// <summary>
        /// Exibe uma Regiao Especifica
        /// </summary>
        /// <param name="id">int Id da regiao desejada</param>
        /// <returns>Regiao Requisitada</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Regiao>> Get (int id) {
            var regiao = await _context.Regiao.FindAsync (id);
            if (regiao == null) {
                return NotFound ();
            }
            return regiao;
        }

        /// <summary>
        /// Adiciona uma Regiao
        /// </summary>
        /// <param name="regiao">string nome da regiao</param>
        /// <returns>Regiao cadastrada</returns>
        [HttpPost]
        public async Task<ActionResult<Regiao>> Post (Regiao regiao) {
            try {
                await _context.AddAsync (regiao);
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }

            return regiao;
        }

        /// <summary>
        /// Faz a modificação de derterminada regiao
        /// </summary>
        /// <param name="id"> int id da regiao</param>
        /// <param name="regiao">string nome da regiao</param>
        /// <returns>Regiao Modificada</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult<Regiao>> Put (int id, Regiao regiao) {
            if (id != regiao.IdRegiao) {
                return BadRequest ();
            }
            _context.Entry (regiao).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var regiao_valida = await _context.Regiao.FindAsync (id);
                if (regiao_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }

            }
            return regiao;
        }

        /// <summary>
        /// Deleta a regiao especificada
        /// </summary>
        /// <param name="id">int id da regiao</param>
        /// <returns>Regiao deletada</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Regiao>> Delete (int id) {
            var regiao = await _context.Regiao.FindAsync (id);
            if (regiao == null) {
                return NotFound ();
            }
            _context.Regiao.Remove (regiao);
            await _context.SaveChangesAsync ();
            return regiao;
        }
    }
}