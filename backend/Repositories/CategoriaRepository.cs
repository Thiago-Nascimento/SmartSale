using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CategoriaRepository : ICategoria
    {
        public async Task<Categoria> Alterar(Categoria categoria)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                _contexto.Entry(categoria).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return categoria;
            }
        }

        public async Task<Categoria> BuscarPorID(int id)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                return await _contexto.Categoria.FindAsync(id);
            }
        }

        public async Task<Categoria> Excluir(Categoria categoria)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                _contexto.Categoria.Remove(categoria);
                await _contexto.SaveChangesAsync();
                return categoria;
            }
        }

        public async Task<List<Categoria>> Listar()
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                return await _contexto.Categoria.ToListAsync();
            }
        }

        public async Task<Categoria> Salvar(Categoria categoria)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                await _contexto.AddAsync(categoria);
                await _contexto.SaveChangesAsync();
                
                return categoria;
            }
        }
    }
}