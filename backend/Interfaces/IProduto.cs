using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;

namespace backend.Interfaces
{
    public interface IProduto
    {
        Task<List<Produto>> Listar();

        Task<Produto> BuscarPorID(int id);

        Task<Produto> Salvar(Produto produto);

        Task<Produto> Alterar(Produto produto);

        Task<Produto> Excluir(Produto produto);
    }
}