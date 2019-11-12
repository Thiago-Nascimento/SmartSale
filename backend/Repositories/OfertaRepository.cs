using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class OfertaRepository : IOferta {
        public async Task<Oferta> Alterar (Oferta oferta) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                _contexto.Entry (oferta).State = EntityState.Modified;
                await _contexto.SaveChangesAsync ();

                return oferta;
            }
        }

        public async Task<Oferta> BuscarPorID (int id) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                return await _contexto.Oferta.FindAsync (id);
            }
        }

        public async Task<Oferta> Excluir (Oferta oferta) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                _contexto.Oferta.Remove (oferta);
                await _contexto.SaveChangesAsync ();
                return oferta;
            }
        }

        public async Task<List<Oferta>> Listar () {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                return await _contexto.Oferta.Include ("IdProdutoNavigation").Include ("IdProdutoNavigation").ToListAsync ();
            }
        }

        public async Task<Oferta> Salvar (Oferta oferta) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                await _contexto.AddAsync (oferta);
                await _contexto.SaveChangesAsync ();

                return oferta;
            }
        }

        public List<Oferta> FiltrarPorNome (FiltroViewModel filtro) {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {

                List<Oferta> oferta = _contexto.Oferta.Where (c => c.Titulo.Contains(filtro.filtro) || c.IdProdutoNavigation.IdCategoriaNavigation.NomeCategoria.StartsWith(filtro.filtro)).Include("IdProdutoNavigation").Include("IdUsuarioNavigation").ToList();

                return oferta;
            }
        }

        public List<Oferta> Ordenar () {
            using (BD_SmartSaleContext _contexto = new BD_SmartSaleContext ()) {
                List<Oferta> oferta = _contexto.Oferta.OrderByDescending (c => c.IdUsuarioNavigation.IdRegiaoNavigation.Bairro).Include("IdUsuarioNavigation").ToList ();

                return oferta;
            }
        }

    }
}