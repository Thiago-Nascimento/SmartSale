using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class TipoUsuarioController : ControllerBase {
        BD_SmartSaleContext _context = new BD_SmartSaleContext ();

        /// <summary>
        /// Listar os Tipo de Usuário
        /// </summary>
        /// <returns>Lista contendo os Tipo de Usuário</returns>
        [HttpGet]
        public async Task<ActionResult<List<TipoUsuario>>> Get () {
            var tipo_usuario = await _context.TipoUsuario.ToListAsync ();
            if (tipo_usuario == null) {
                return NotFound ();
            }
            return tipo_usuario;
        }

        /// <summary>
        /// Exibe um Tipo de Usuário Específico
        /// </summary>
        /// <param name="id">int Id do Tipo de Usuário desejado</param>
        /// <returns>Tipo de Usuário Requisitado</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<TipoUsuario>> Get (int id) {
            var tipo_usuario = await _context.TipoUsuario.FindAsync (id);
            if (tipo_usuario == null) {
                return NotFound ();
            }
            return tipo_usuario;
        }

        /// <summary>
        /// Adiciona um Tipo de Usuário
        /// </summary>
        /// <param name="tipo_usuario">string tipo de tipo de usuario</param>
        /// <returns>Tipo de Usuario cadastrado</returns>
        [HttpPost]
        public async Task<ActionResult<TipoUsuario>> Post (TipoUsuario tipo_usuario) {
            try {
                await _context.AddAsync (tipo_usuario);
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }

            return tipo_usuario;
        }

        /// <summary>
        /// Faz a modificação de determinado Tipo de Usuário
        /// </summary>
        /// <param name="id"> int id do tipo usuario</param>
        /// <param name="tipo_usuario">string tipo do usuario</param>
        /// <returns>Tipo de Usuário Modificado</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult<TipoUsuario>> Put (int id, TipoUsuario tipo_usuario) {
            if (id != tipo_usuario.IdTipoUsuario) {
                return BadRequest ();
            }
            _context.Entry (tipo_usuario).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var tipo_usuario_valido = await _context.TipoUsuario.FindAsync (id);
                if (tipo_usuario_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }

            }
            return tipo_usuario;
        }

        /// <summary>
        /// Delete a o Tipo de Usuário especificado
        /// </summary>
        /// <param name="id">int id do Tipo do Usuário</param>
        /// <returns>Tipo de Usuário deletada</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<TipoUsuario>> Delete (int id) {
            var tipo_usuario = await _context.TipoUsuario.FindAsync (id);
            if (tipo_usuario == null) {
                return NotFound ();
            }
            _context.TipoUsuario.Remove (tipo_usuario);
            await _context.SaveChangesAsync ();
            return tipo_usuario;
        }
    }
}