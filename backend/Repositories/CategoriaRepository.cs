using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;

namespace backend.Repositories
{
    public class CategoriaRepository : ICategoria
    {
        public async Task<Categoria> Alterar(Categoria categoria)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Categoria> BuscarPorID(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Categoria> Excluir(Categoria categoria)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<Categoria>> Listar()
        {
            throw new System.NotImplementedException();
        }

        public async Task<Categoria> Salvar(Categoria categoria)
        {
            throw new System.NotImplementedException();
        }
    }
}