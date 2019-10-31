using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class TipoUsuarioRepository : ITipoUsuario {
        public async Task<TipoUsuario> Alterar (TipoUsuario tipoUsuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                _context.Entry (tipoUsuario).State = EntityState.Modified;
                await _context.SaveChangesAsync ();
            }

            return tipoUsuario;
        }

        public async Task<TipoUsuario> BuscarPorID (int id) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ())
            return await _context.TipoUsuario.FindAsync (id);
        }

        public async Task<TipoUsuario> Excluir (TipoUsuario tipoUsuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                _context.TipoUsuario.Remove (tipoUsuario);
                await _context.SaveChangesAsync ();
                return tipoUsuario;
            }
        }

        public async Task<List<TipoUsuario>> Listar () {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                return await _context.TipoUsuario.ToListAsync ();
            }
        }

        public async Task<TipoUsuario> Salvar (TipoUsuario tipoUsuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                await _context.AddAsync (tipoUsuario);
                await _context.SaveChangesAsync ();
                return tipoUsuario;
            }
        }
    }
}