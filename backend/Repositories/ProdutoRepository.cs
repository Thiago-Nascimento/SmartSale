using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ProdutoRepository : IProduto
    {
        public async Task<Produto> Alterar(Produto produto)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                _contexto.Entry(produto).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return produto;
            }
        }

        public async Task<Produto> BuscarPorID(int id)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                return await _contexto.Produto.FindAsync(id);
            }
        }

        public async Task<Produto> Excluir(Produto produto)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                _contexto.Produto.Remove(produto);
                await _contexto.SaveChangesAsync();
                return produto;
            }
        }

        public async Task<List<Produto>> Listar()
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                return await _contexto.Produto.Include("IdCategoriaNavigation").ToListAsync();
            }
        }

        public async Task<Produto> Salvar(Produto produto)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                await _contexto.AddAsync(produto);
                await _contexto.SaveChangesAsync();
                return produto;
            }
        }
    }
}