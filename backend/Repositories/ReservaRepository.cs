using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;

namespace backend.Repositories
{
    public class ReservaRepository : IReserva
    {
        public async Task<Reserva> Alterar(Reserva reserva)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Reserva> BuscarPorID(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Reserva> Excluir(Reserva reserva)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<Reserva>> Listar()
        {
            throw new System.NotImplementedException();
        }

        public Task<Reserva> Salvar(Reserva reserva)
        {
            throw new System.NotImplementedException();
        }
    }
}