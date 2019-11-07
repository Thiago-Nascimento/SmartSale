using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domains;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase {
        CategoriaRepository _repositorio = new CategoriaRepository ();

        /// <summary>
        /// Lista as Categorias
        /// </summary>
        /// <returns>Lista contendo as Categorias</returns>
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get () {

            // Definimos a variável 'categorias' que chama o CategoriaRepository que chama a função Listar
            var categorias = await _repositorio.Listar ();

            // Fazemos uma verificação que se não existir determinada Categoria retorna NotFound(404)
            if (categorias == null) {
                return NotFound ("Categorias não encontradas");
            }
            return categorias;
        }

    
        /// <summary>
        /// Exibe uma Categoria Especifica
        /// </summary>
        /// <param name="id">int Id da categoria desejada</param>
        /// <returns>Categoria Requisitada</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Categoria>> Get (int id) {

            // Definimos a variavel categoria que chama o CategoriaRepository que chama a Função BuscarPorId com o parametro ID para realizar a buscar
            var categoria = await _repositorio.BuscarPorID (id);
            
            // Fazemos a verificação que se a busca retornar null aparecerá o erro NotFound(404)
            if (categoria == null) {
                return NotFound ("Categorias não encontradas");
            }
            return categoria;
        }

        /// <summary>
        /// Adiciona uma Categoria
        /// </summary>
        /// <param name="categoria">string nome da categoria</param>
        /// <returns>Categoria cadastrada</returns>
        [Authorize(Roles="1")]
        [HttpPost]
        public async Task<ActionResult<Categoria>> Post (Categoria categoria) {
            
            // Fazemos um tratamento de erro onde o metodos Salvar precisa do parametro categoria
            try {
                await _repositorio.Salvar (categoria);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }

            return categoria;
        }

        /// <summary>
        /// Faz a modificação de derterminada categoria
        /// </summary>
        /// <param name="id"> int id da categoria</param>
        /// <param name="categoria">string nome da categoria</param>
        /// <returns>Categoria Modificada</returns>
        [Authorize(Roles="1")]
        [HttpPut ("{id}")]
        public async Task<ActionResult<Categoria>> Put (int id, Categoria categoria) {
            
            // Fazemos uma verificação que se o ID que é para ser alterado for diferente de um Id valido retorna BadRequest(400)
            if (id != categoria.IdCategoria) {
                return BadRequest ();
            }

            // Fazemos um tratamento de erro para realizar a alteração no Id em questão
            try {
                await _repositorio.Alterar (categoria);
            } catch (DbUpdateConcurrencyException) {
                
                // Definimos a variavel 'categoria_valida'
                // Se houver algum erro o programa ira solicitar uma busca por id para ver se realmente existe
                var categoria_valida = await _repositorio.BuscarPorID (id);

                // Novamente, se o 'categoria_valida' for igual a null, retornará o erro NotFound(404)
                if (categoria_valida == null) {
                    return NotFound ("Categoria não encontrada");
                } else {
                    throw;
                }

            }
            return categoria;
        }

        /// <summary>
        /// Delete a categoria especificada
        /// </summary>
        /// <param name="id">int id da categoria</param>
        /// <returns>Categoria deletada</returns>
        [Authorize(Roles="1")]
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Categoria>> Delete (int id) {
            var categoria = await _repositorio.BuscarPorID (id);
            if (categoria == null) {
                return NotFound ("Categoria não encontrada");
            }

            // Aqui nos chamamos 'CategoriaRepository' para Excluir a Categoria desejada
            await _repositorio.Excluir (categoria);
            return categoria;
        }

        //api/Categoria/FiltroPorNome
        /// <summary>
        /// filtra as categorias por nome
        /// </summary>
        /// <param name="FiltroPorNome"></param>
        /// <returns>Categoria Requisitada</returns>
        [HttpGet ("FiltroPorNome")]
        public ActionResult<List<Categoria>> GetFiltro (FiltroViewModel FiltroPorNome) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {

                // Aqui nos fazemos uma Lista das Categoria passando por um Filtro
                // Que se a palavra que o usuario digitar houver na em alguma Categoria existente vai retornar isso
                List<Categoria> categorias = _contexto.Categoria.Where (cat => cat.NomeCategoria.StartsWith(FiltroPorNome.filtro)).ToList();

                return categorias;
            }
        }


        //api/Categoria/FiltroPorNome
        //
        [HttpGet ("Ordenar")]
        public ActionResult<List<Categoria>> GetOrdenar () {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {

                // Aqui ordenamos o conteudo das categoria e ordem Decrescentee e listamos isso
                List<Categoria> categorias = _contexto.Categoria.OrderByDescending (cat => cat.NomeCategoria).ToList();

                return categorias;
            }
        }
    }
}