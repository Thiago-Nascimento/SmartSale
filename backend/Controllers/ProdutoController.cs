using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[Controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase {
        BD_SmartSaleContext _context = new BD_SmartSaleContext ();
        //listar produto
        /// <summary>
        /// Lista as produto
        /// </summary>
        /// <returns>Lista contendo os produtos</returns>
        [HttpGet]
        public async Task<ActionResult<List<Produto>>> Get () { //Include puxa a chave estrangeira
            var produtos = await _context.Produto.Include ("IdCategoriaNavigation").ToListAsync ();
            if (produtos == null) {
                return NotFound ();
            }
            return produtos;
        }

        //pegar produto especifica por id 
        /// <summary>
        /// Exibe um produto especifico
        /// </summary>
        /// <param name="id">int Id do produto desejado</param>
        /// <returns>Produto requisitado</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Produto>> Get (int id) {
            var produtos = await _context.Produto.FindAsync (id);
            if (produtos == null) {
                return NotFound ();
            }
            return produtos;

        }
        /// <summary>
        /// Adiciona um produto 
        /// </summary>
        /// <param name="produto">string Nome do produto</param>
        /// <returns>Produto cadastrado</returns>
        [HttpPost]
        public async Task<ActionResult<Produto>> Post (Produto produto) {
            try {
                //adiciona uma nova "categoria" no "Categoria"
                await _context.AddAsync (produto);
                //salva as mudanças feitas no banco
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {

                throw;
            }

            return produto;

        }
        /// <summary>
        /// Faz a modificação do produto especificado
        /// </summary>
        /// <param name="id">int Id do produto</param>
        /// <param name="produto">string Nome do produto</param>
        /// <returns>Produto modificado</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult<Produto>> Put (int id, Produto produto) {
            if (id != produto.IdProduto) {
                return BadRequest ();
            }
            _context.Entry (produto).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var categoria_valida = await _context.Produto.FindAsync (id);
                if (produto == null) {
                    return NotFound ();
                } else {
                    throw;
                }

            }

            return produto;

        }
        /// <summary>
        /// Deleta o produto especificado
        /// </summary>
        /// <param name="id">int Id do produto</param>
        /// <returns>Produto deletado</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Produto>> Delete (int id) {
            var produto = await _context.Produto.FindAsync (id);
            if (produto == null) {
                return NotFound ();
            }
            _context.Produto.Remove (produto);
            await _context.SaveChangesAsync ();
            return produto;
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