using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase {
        BD_SmartSaleContext _context = new BD_SmartSaleContext ();

        /// <summary>
        /// Lista as ofertas cadastradas
        /// </summary>
        /// <returns>Lista de ofertas</returns>
        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get () {
            var Ofertas = await _context.Oferta.Include("IdProdutoNavigation").Include("IdUsuarioNavigation").ToListAsync ();
            if (Ofertas == null) {
                return NotFound ();
            }
            return Ofertas;
        }

        /// <summary>
        /// Exibe uma oferta específica
        /// </summary>
        /// <param name="id">int Id da oferta desejada</param>
        /// <returns>Oferta requisitada</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Oferta>> Get (int id) {
            var Oferta = await _context.Oferta.FindAsync (id);
            if (Oferta == null) {
                return NotFound ();
            }
            return Oferta;
        }

        /// <summary>
        /// Adiciona uma oferta
        /// </summary>
        /// <param name="Oferta">string nome da oferta</param>
        /// <returns>Oferta cadastrada</returns>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post (Oferta Oferta) {
            try {
                await _context.AddAsync (Oferta);
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return Oferta;
        }

        /// <summary>
        /// Faz a modificação de derterminada oferta
        /// </summary>
        /// <param name="id"> int id da oferta</param>
        /// <param name="Oferta">string nome da oferta</param>
        /// <returns>Oferta Modificada</returns>
        [Authorize]
        [HttpPut ("{id}")]
        public async Task<ActionResult<Oferta>> Put (int id, Oferta Oferta) {
            if (id != Oferta.IdOferta) {
                return BadRequest ();
            }
            _context.Entry (Oferta).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var Oferta_valida = await _context.Oferta.FindAsync (id);
                if (Oferta_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            return Oferta;
        }

        /// <summary>
        /// Delete a oferta específicada
        /// </summary>
        /// <param name="id">int id da oferta</param>
        /// <returns>Oferta deletada</returns>
        [Authorize]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Oferta>> Delete (int id) {
            var Oferta = await _context.Oferta.FindAsync (id);
            if (Oferta == null) {
                return NotFound ();
            }
            _context.Oferta.Remove (Oferta);
            await _context.SaveChangesAsync ();
            return Oferta;
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