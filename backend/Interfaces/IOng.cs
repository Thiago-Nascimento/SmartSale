using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;

namespace backend.Interfaces
{
    public interface IOng
    {
        Task<List<Ong>> Listar();

        Task<Ong> BuscarPorID(int id);

        Task<Ong> Salvar(Ong ong);

        Task<Ong> Alterar(Ong ong);

        Task<Ong> Excluir(Ong ong);
    }
}