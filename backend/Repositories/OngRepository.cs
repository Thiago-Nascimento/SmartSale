using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class OngRepository : IOng {
        public async Task<Ong> Alterar (Ong ong) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                _contexto.Entry (ong).State = EntityState.Modified;
                await _contexto.SaveChangesAsync ();
            }
            return ong;
        }

        public async Task<Ong> BuscarPorID (int id) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                return await _contexto.Ong.FindAsync (id);
            }
        }

        public async Task<Ong> Excluir (Ong ong) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                _contexto.Ong.Remove (ong);
                await _contexto.SaveChangesAsync ();
            }
            return ong;
        }

        public async Task<List<Ong>> Listar () {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                return await  _contexto.Ong.Include("IdRegiaoNavigation").ToListAsync();
            }    
        }

        public async Task<Ong> Salvar (Ong ong) {
           using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                await _contexto.AddAsync(ong);
                await _contexto.SaveChangesAsync();
            }

            return ong;
        }
    }
}