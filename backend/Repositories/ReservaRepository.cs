using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class ReservaRepository : IReserva {
        public async Task<Reserva> Alterar (Reserva reserva) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                _context.Entry (reserva).State = EntityState.Modified;
                await _context.SaveChangesAsync ();
            }
            return reserva;
        }

        public async Task<Reserva> BuscarPorID (int id) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ())
            return await _context.Reserva.FindAsync (id);
        }

        public async Task<Reserva> Excluir (Reserva reserva) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                _context.Reserva.Remove (reserva);
                await _context.SaveChangesAsync ();
                return reserva;
            }
        }

        public async Task<List<Reserva>> Listar () {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                return await _context.Reserva.ToListAsync ();
            }
        }

        public async Task<Reserva> Salvar (Reserva reserva) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                await _context.AddAsync (reserva);
                await _context.SaveChangesAsync ();

                 return reserva;               
            }
        }
    }
}