using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class RegiaoRepository : IRegiao {
        public async Task<Regiao> Alterar (Regiao regiao) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                _contexto.Entry (regiao).State = EntityState.Modified;
                await _contexto.SaveChangesAsync ();
            }
            return regiao;
        }

        public async Task<Regiao> BuscarPorID (int id) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                return await _contexto.Regiao.FindAsync (id);
            }
        }

        public async Task<Regiao> Excluir (Regiao regiao) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                _contexto.Regiao.Remove (regiao);
                await _contexto.SaveChangesAsync ();
            }
            return regiao;
        }

        public async Task<List<Regiao>> Listar () {
             using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                return await  _contexto.Regiao.ToListAsync();
            }    
        }

        public async Task<Regiao> Salvar (Regiao regiao) {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                await _contexto.AddAsync(regiao);
                await _contexto.SaveChangesAsync();
            }

            return regiao
            ;
        }
    }
}