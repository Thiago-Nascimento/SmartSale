using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;

namespace backend.Interfaces
{
    public interface IReserva
    {
        Task<List<Reserva>> Listar();

        Task<Reserva> BuscarPorID(int id);

        Task<Reserva> Salvar(Reserva reserva);

        Task<Reserva> Alterar(Reserva reserva);

        Task<Reserva> Excluir(Reserva reserva);
    }
}