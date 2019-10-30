using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;

namespace backend.Repositories
{
    public class ProdutoRepository : IProduto
    {
        public async Task<Produto> Alterar(Produto produto)
        {
            throw new System.NotImplementedException();
        }

        public Task<Produto> BuscarPorID(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<Produto> Excluir(Produto produto)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Produto>> Listar()
        {
            throw new System.NotImplementedException();
        }

        public Task<Produto> Salvar(Produto produto)
        {
            throw new System.NotImplementedException();
        }
    }
}