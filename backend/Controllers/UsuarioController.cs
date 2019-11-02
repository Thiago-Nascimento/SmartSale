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
        UploadRepository _uploadRepo = new UploadRepository();

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
        public async Task<ActionResult<Usuario>> Post ([FromForm]Usuario usuario) {
            try { 
                var arquivo = Request.Form.Files[0];

                usuario.NomeUsuario = Request.Form["nomeUsuario"].ToString();
                usuario.Documento = Request.Form["documento"].ToString();
                usuario.RazaoSocial = Request.Form["razaoSocial"].ToString();
                usuario.Email = Request.Form["email"].ToString();
                usuario.Senha = Request.Form["senha"].ToString();
                usuario.Telefone = Request.Form["telefone"].ToString();
                usuario.Telefone2 = Request.Form["telefone2"].ToString();
                usuario.Endereco = Request.Form["endereco"].ToString();
                usuario.Cep = Request.Form["cep"].ToString();
                usuario.Pontuacao = int.Parse(Request.Form["pontuacao"]);
                usuario.IdTipoUsuario = int.Parse(Request.Form["idTipoUsuario"]);
                usuario.IdRegiao = int.Parse(Request.Form["idRegiao"]);
               
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
        public async Task<ActionResult<Usuario>> Put (int id, [FromForm]Usuario usuario) {
            if (id != usuario.IdUsuario) {
                return BadRequest ();
            }            
            try {
                var arquivo = Request.Form.Files[0];

                usuario.NomeUsuario = Request.Form["nomeUsuario"].ToString();
                usuario.Documento = Request.Form["documento"].ToString();
                usuario.RazaoSocial = Request.Form["razaoSocial"].ToString();
                usuario.Email = Request.Form["email"].ToString();
                usuario.Senha = Request.Form["senha"].ToString();
                usuario.Telefone = Request.Form["telefone"].ToString();
                usuario.Telefone2 = Request.Form["telefone2"].ToString();
                usuario.Endereco = Request.Form["endereco"].ToString();
                usuario.Cep = Request.Form["cep"].ToString();
                usuario.Pontuacao = int.Parse(Request.Form["pontuacao"]);
                usuario.IdTipoUsuario = int.Parse(Request.Form["idTipoUsuario"]);
                usuario.IdRegiao = int.Parse(Request.Form["idRegiao"]);
                
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