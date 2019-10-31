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
    public class ReservaController : ControllerBase {
        // BD_SmartSaleContext _context = new BD_SmartSaleContext ();

    ReservaRepository _repositorio = new ReservaRepository();

        /// <summary>
        /// Lista as reservas cadastradas
        /// </summary>
        /// <returns>Lista de reservas</returns>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<Reserva>>> Get () {
            var reservas = await _repositorio.Listar();
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
        [Authorize]
        [HttpGet ("{id}")]
        public async Task<ActionResult<Reserva>> Get (int id) {
            var reserva = await _repositorio.BuscarPorID (id);
            if (reserva == null) {
                return NotFound ();
            }
            return reserva;
        }

        /// <summary>
        /// Adiciona uma reserva
        /// </summary>
        /// <param name="reserva">string nome da reserva</param>
        /// <returns>Reserva cadastrada</returns>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Reserva>> Post (Reserva reserva) {
            try {
               await _repositorio.Salvar(reserva);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return reserva;
        }

        /// <summary>
        /// Faz a modificação de derterminada reserva
        /// </summary>
        /// <param name="id"> int id da reserva</param>
        /// <param name="reserva">string nome da reserva</param>
        /// <returns>reserva Modificada</returns>
        [Authorize]
        [HttpPut ("{id}")]
        public async Task<ActionResult<Reserva>> Put (int id, Reserva reserva) {
            if (id != reserva.IdReserva) {
                return BadRequest ();
            }
           
            try {
                await _repositorio.Alterar(reserva);
               
            } catch (DbUpdateConcurrencyException) {
               var reserva_valida = await _repositorio.BuscarPorID(id);
                
                if(reserva_valida == null){
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
        [Authorize]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Reserva>> Delete (int id) {
            var reserva = await _repositorio.BuscarPorID (id);
            if (reserva == null) {
                return NotFound ();
            }
           
            return reserva;
        }
    }
}