using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class UsuarioRepository : IUsuario {
        public async Task<Usuario> Alterar (Usuario usuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                _context.Entry (usuario).State = EntityState.Modified;
                await _context.SaveChangesAsync ();
            }
            return usuario;
        }

        public async Task<Usuario> BuscarPorID (int id) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ())
            return await _context.Usuario.FindAsync (id);
        }

        public async Task<Usuario> Excluir (Usuario usuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                _context.Usuario.Remove (usuario);
                await _context.SaveChangesAsync ();
                return usuario;
            }
        }

        public async Task<List<Usuario>> Listar () {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                return await _context.Usuario.Include ("IdRegiaoNavigation").Include ("IdTipoUsuarioNavigation").ToListAsync ();

            }
        }

        public async Task<Usuario> Salvar (Usuario usuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                await _context.AddAsync (usuario);
                await _context.SaveChangesAsync ();

                return usuario;
            }
        }
    }
}