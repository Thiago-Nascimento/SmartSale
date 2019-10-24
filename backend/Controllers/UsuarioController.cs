using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

namespace backend.Controllers {
    
    [Route ("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase {

        BD_SmartSaleContext _context = new BD_SmartSaleContext ();

        /// <summary>
        /// Lista os usuarios
        /// </summary>
        /// <returns>Lista contendo os usuarios</returns>
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get () {
            var usuario = await _context.Usuario.Include("IdRegiaoNavigation").Include("IdTipoUsuarioNavigation").ToListAsync ();
            if (usuario == null) {
                return NotFound ();
            }
            return usuario;
        }

        /// <summary>
        /// Exibe um usuario especifico
        /// </summary>
        /// <param name="id">int id do usuario desejavel</param>
        /// <returns>Usuario requisitado</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Usuario>> Get (int id) {
            var usuario = await _context.Usuario.Include("IdRegiaoNavigation").Include("IdTipoUsuarioNavigation").FirstOrDefaultAsync(e => e.IdUsuario == id); 
            if (usuario == null) {
                return NotFound ();
            }
            return usuario;
        }

        /// <summary>
        /// Adiciona um usuario
        /// </summary>
        /// <param name="usuario">string nome do usuario</param>
        /// <returns>Usuario cadastrado</returns>
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post (Usuario usuario) {
            try {
                await _context.AddAsync (usuario);
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {

                throw;
            }
            return usuario;
        }

        /// <summary>
        /// Faz modificações em determinados usuarios
        /// </summary>
        /// <param name="id">int id do usuario</param>
        /// <param name="usuario">string nome do usuario</param>
        /// <returns>Usuario modificado</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult<Usuario>> Put (int id, Usuario usuario) {
            if (id != usuario.IdUsuario) {
                return BadRequest ();
            }
            _context.Entry (usuario).State = EntityState.Modified;
            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var usuario_valida = await _context.Usuario.FindAsync (id);
                if (usuario_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }

            }

            return usuario;
        }

        /// <summary>
        /// Deleta o usuario especificado
        /// </summary>
        /// <param name="id">int id do usuario</param>
        /// <returns>Usuario deletado</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Usuario>> Delete (int id) {
            var usuario = await _context.Usuario.FindAsync (id);
            if (usuario == null) {
                return NotFound ();
            }
            _context.Usuario.Remove (usuario);
            await _context.SaveChangesAsync ();
            return usuario;
        }
    }

}