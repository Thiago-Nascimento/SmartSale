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
    public class UsuarioController : ControllerBase {

        // BD_SmartSaleContext _context = new BD_SmartSaleContext ();

        UsuarioRepository _repositorio = new UsuarioRepository ();
        UploadRepository _uploadRepo = new UploadRepository ();

        /// <summary>
        /// Lista os usuarios
        /// </summary>
        /// <returns>Lista contendo os usuarios</returns>
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get () {
            var usuarios = await _repositorio.Listar ();
            if (usuarios == null) {
                return NotFound ("Usuarios não encontrados");
            }
            return usuarios;
        }

        /// <summary>
        /// Exibe um usuario especifico
        /// </summary>
        /// <param name="id">int id do usuario desejavel</param>
        /// <returns>Usuario requisitado</returns>
        [Authorize]
        [HttpGet ("{id}")]
        public async Task<ActionResult<Usuario>> Get (int id) {
            var usuario = await _repositorio.BuscarPorID (id);
            if (usuario == null) {
                return NotFound ("Usuario não encontrado");
            }
            return usuario;
        }

        /// <summary>
        /// Adiciona um usuario
        /// </summary>
        /// <param name="usuario">string nome do usuario</param>
        /// <returns>Usuario cadastrado</returns>
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post ([FromForm] Usuario usuario) {
            try {
                var arquivo = Request.Form.Files[0];

                usuario.NomeUsuario = Request.Form["nomeUsuario"].ToString ();
                usuario.Documento = Request.Form["documento"].ToString ();
                usuario.RazaoSocial = Request.Form["razaoSocial"].ToString ();
                usuario.Email = Request.Form["email"].ToString ();
                usuario.Senha = Request.Form["senha"].ToString ();
                usuario.Telefone = Request.Form["telefone"].ToString ();
                usuario.Telefone2 = Request.Form["telefone2"].ToString ();
                usuario.Endereco = Request.Form["endereco"].ToString ();
                usuario.Cep = Request.Form["cep"].ToString ();
                usuario.Pontuacao = int.Parse (Request.Form["pontuacao"]);
                usuario.IdTipoUsuario = int.Parse (Request.Form["idTipoUsuario"]);
                usuario.IdRegiao = int.Parse (Request.Form["idRegiao"]);

                usuario.Foto = _uploadRepo.Upload (arquivo, "imgPerfil");

                if (usuario.IdTipoUsuario == 2) {
                    if (_repositorio.ValidaCNPJ (usuario)) {
                        await _repositorio.Salvar (usuario);
                    } else {
                        return BadRequest ("O CNPJ digitado está incorreto");
                    }
                }

                if (usuario.IdTipoUsuario == 3) {
                    if (_repositorio.ValidaCPF (usuario)) {
                        await _repositorio.Salvar (usuario);
                    } else {
                        return BadRequest ("O CPF digitado está incorreto");
                    }
                }

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
        public async Task<ActionResult<Usuario>> Put (int id, [FromForm] Usuario usuario) {
            if (id != usuario.IdUsuario) {
                return BadRequest ("Usuario não encontrado");
            }
            try {
                var arquivo = Request.Form.Files[0];

                usuario.NomeUsuario = Request.Form["nomeUsuario"].ToString ();
                usuario.Documento = Request.Form["documento"].ToString ();
                usuario.RazaoSocial = Request.Form["razaoSocial"].ToString ();
                usuario.Email = Request.Form["email"].ToString ();
                usuario.Senha = Request.Form["senha"].ToString ();
                usuario.Telefone = Request.Form["telefone"].ToString ();
                usuario.Telefone2 = Request.Form["telefone2"].ToString ();
                usuario.Endereco = Request.Form["endereco"].ToString ();
                usuario.Cep = Request.Form["cep"].ToString ();
                usuario.Pontuacao = int.Parse (Request.Form["pontuacao"]);
                usuario.IdTipoUsuario = int.Parse (Request.Form["idTipoUsuario"]);
                usuario.IdRegiao = int.Parse (Request.Form["idRegiao"]);

                usuario.Foto = _uploadRepo.Upload (arquivo, "imgPerfil");

                await _repositorio.Alterar (usuario);

            } catch (DbUpdateConcurrencyException) {
                var usuario_valida = await _repositorio.BuscarPorID (id);
                if (usuario_valida == null) {
                    return NotFound ("Usuario não encontrado");
                } else {
                    throw;
                }

            }

            return NoContent ();
        }

        /// <summary>
        /// Deleta o usuario especificado
        /// </summary>
        /// <param name="id">int id do usuario</param>
        /// <returns>Usuario deletado</returns>
        [Authorize (Roles = "1")]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Usuario>> Delete (int id) {
            var usuario = await _repositorio.BuscarPorID (id);
            if (usuario == null) {
                return NotFound ("Usuario não encontrado");
            }

            try {
                await _repositorio.Excluir (usuario);
            } catch (Microsoft.EntityFrameworkCore.DbUpdateException ex) {
                return BadRequest(new {
                    mensagem="Erro! O usuário provavelmente está atrelado a algumas ofertas, não é possível excluí-lo. Raw: " + ex
                });
            }

            return usuario;
        }
    }

}