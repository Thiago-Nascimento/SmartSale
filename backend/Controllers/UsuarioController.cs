using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase {


       // BD_SmartSaleContext _context = new BD_SmartSaleContext ();

    UsuarioRepository _repositorio = new UsuarioRepository();

        /// <summary>
        /// Lista os usuarios
        /// </summary>
        /// <returns>Lista contendo os usuarios</returns>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get () {
            var usuario = await _repositorio.Listar();
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
        [Authorize]
        [HttpGet ("{id}")]
        public async Task<ActionResult<Usuario>> Get (int id) {
            var usuario = await _repositorio.BuscarPorID(id);
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
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post (Usuario usuario) {
            try { 
               await _repositorio.Salvar(usuario);
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
        [Authorize]
        [HttpPut ("{id}")]
        public async Task<ActionResult<Usuario>> Put (int id, Usuario usuario) {
            if (id != usuario.IdUsuario) {
                return BadRequest ();
            }
            
            try {
                await _repositorio.Alterar(usuario);
                
            } catch (DbUpdateConcurrencyException) {
                var usuario_valida = await _repositorio.BuscarPorID(id);
                if (usuario_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }

            }

            return NoContent();
        }

        /// <summary>
        /// Deleta o usuario especificado
        /// </summary>
        /// <param name="id">int id do usuario</param>
        /// <returns>Usuario deletado</returns>
        [Authorize]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Usuario>> Delete (int id) {
            var usuario = await _repositorio.BuscarPorID(id);
            if (usuario == null) {
                return NotFound ();
            }
            
            return usuario;
        }
    }

}