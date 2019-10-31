using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Repositories;


namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class DoacaoController : ControllerBase {
        //BD_SmartSaleContext _context = new BD_SmartSaleContext ();
        DoacaoRepository _repositorio = new DoacaoRepository();

        /// <summary>
        /// Lista as doações cadastradas
        /// </summary>
        /// <returns>Lista de doações</returns>
        [HttpGet]
        public async Task<ActionResult<List<Doacao>>> Get () {
            var doacoes = await _repositorio.Listar ();
            if (doacoes == null) {
                return NotFound ();
            }
            return doacoes;
        }

        /// <summary>
        /// Exibe uma doação específica
        /// </summary>
        /// <param name="id">int Id da doação desejada</param>
        /// <returns>Doacao Requisitada</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Doacao>> Get (int id) {
            var Doacao = await _repositorio.BuscarPorID(id);
            if (Doacao == null) {
                return NotFound ();
            }
            return Doacao;
        }

        /// <summary>
        /// Adiciona uma Doacao
        /// </summary>
        /// <param name="Doacao">string nome da Doacao</param>
        /// <returns>Doacao cadastrada</returns>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Doacao>> Post (Doacao Doacao) {
            try {
                await _repositorio.Salvar (Doacao);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return Doacao;
        }

        /// <summary>
        /// Faz a modificação de derterminada doação
        /// </summary>
        /// <param name="id"> int id da doação</param>
        /// <param name="Doacao">string nome da doação</param>
        /// <returns>Doação modificada</returns>
        [Authorize]
        [HttpPut ("{id}")]
        public async Task<ActionResult<Doacao>> Put (int id, Doacao Doacao) {
            if (id != Doacao.IdDoacao) {
                return BadRequest ();
            }

            try {
                await _repositorio.Alterar (Doacao);
            } catch (DbUpdateConcurrencyException) {
                var Doacao_valida = await _repositorio.BuscarPorID (id);
                if (Doacao_valida == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            return Doacao;
        }

        /// <summary>
        /// Deleta uma doação específicada
        /// </summary>
        /// <param name="id">int id da doação</param>
        /// <returns>Doação deletada</returns>
        [Authorize]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Doacao>> Delete (int id) {
            var Doacao = await _repositorio.BuscarPorID (id);
            if (Doacao == null) {
                return NotFound ();
            }
            await _repositorio.Excluir (Doacao);
            return Doacao;
        }
    }
}