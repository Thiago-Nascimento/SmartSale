using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;

namespace backend.Interfaces
{
    public interface IRegiao
    {
        Task<List<Regiao>> Listar();

        Task<Regiao> BuscarPorID(int id);

        Task<Regiao> Salvar(Regiao regiao);

        Task<Regiao> Alterar(Regiao regiao);

        Task<Regiao> Excluir(Regiao regiao);
    }
}