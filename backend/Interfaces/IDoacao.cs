using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;

namespace backend.Interfaces
{
    public interface IDoacao
    {
        Task<List<Doacao>> Listar();

        Task<Doacao> BuscarPorID(int id);

        Task<Doacao> Salvar(Doacao doacao);

        Task<Doacao> Alterar(Doacao doacao);

        Task<Doacao> Excluir(Doacao doacao);
    }
}