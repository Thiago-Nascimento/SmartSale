using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;

namespace backend.Interfaces
{
    public interface IOferta
    {
        Task<List<Oferta>> Listar();

        Task<Oferta> BuscarPorID(int id);

        Task<Oferta> Salvar(Oferta oferta);

        Task<Oferta> Alterar(Oferta oferta);

        Task<Oferta> Excluir(Oferta oferta);

        List<Oferta> FiltrarPorNome (FiltroViewModel filtro);

        List<Oferta> Ordenar ();

    }
}