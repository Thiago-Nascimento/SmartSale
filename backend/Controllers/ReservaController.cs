using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase {
        BD_SmartSaleContext _context = new BD_SmartSaleContext ();

        /// <summary>
        /// Lista as reservas cadastradas
        /// </summary>
        /// <returns>Lista de reservas</returns>
        [HttpGet]
        public async Task<ActionResult<List<Reserva>>> Get () {
            var reservas = await _context.Reserva.Include("IdOfertaNavigation").Include("IdUsuarioNavigation").ToListAsync ();
            if (reservas == null) {
                return NotFound ();
            }
            return reservas;
        }

        /// <summary>
        /// Exibe uma reserva específica
        /// </summary>
        /// <param name="id">int Id da reserva desejada</param>
        /// <returns>Reserva requisitada</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Reserva>> Get (int id) {
            var reserva = await _context.Reserva.FindAsync (id);
            if (reserva == null) {
                return NotFound ();
            }
            return reserva;
        }

        /// <summary>
        /// Adiciona uma reserva
        /// </summary>
        /// <param name="Reserva">string nome da reserva</param>
        /// <returns>Reserva cadastrada</returns>
        [HttpPost]
        public async Task<ActionResult<Reserva>> Post (Reserva reserva) {
            try {
                await _context.AddAsync (reserva);
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return reserva;
        }

        /// <summary>
        /// Faz a modificação de derterminada reserva
        /// </summary>
        /// <param name="id"> int id da reserva</param>
        /// <param name="Reserva">string nome da reserva</param>
        /// <returns>reserva Modificada</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult<Reserva>> Put (int id, Reserva reserva) {
            if (id != reserva.IdReserva) {
                return BadRequest ();
            }
            _context.Entry (reserva).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var reserva_valida = await _context.Reserva.FindAsync (id);
                if (reserva_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            return reserva;
        }

        /// <summary>
        /// Delete a reserva específicada
        /// </summary>
        /// <param name="id">int id da reserva</param>
        /// <returns>Reserva deletada</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Reserva>> Delete (int id) {
            var reserva = await _context.Reserva.FindAsync (id);
            if (reserva == null) {
                return NotFound ();
            }
            _context.Reserva.Remove (reserva);
            await _context.SaveChangesAsync ();
            return reserva;
        }
    }
}