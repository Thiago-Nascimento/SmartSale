using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace backend.Repositories
{
    public class DoacaoRepository : IDoacao
    {
        public async Task<Doacao> Alterar(Doacao doacao)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                _contexto.Entry(doacao).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return doacao;
            }
        }

        public async Task<Doacao> BuscarPorID(int id)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                return await _contexto.Doacao.FindAsync(id);
            }
        }

        public async Task<Doacao> Excluir(Doacao doacao)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                _contexto.Doacao.Remove(doacao);
                await _contexto.SaveChangesAsync();
                return doacao;
            }
        }

        public async Task<List<Doacao>> Listar()
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                return await _contexto.Doacao.Include("IdOfertaNavigation").Include("IdOngNavigation").ToListAsync();
            }
        }

        public async Task<Doacao> Salvar(Doacao doacao)
        {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                await _contexto.AddAsync(doacao);
                await _contexto.SaveChangesAsync();

                return doacao;
            }
        }
    }
}