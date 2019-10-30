using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;

namespace backend.Repositories
{
    public class UsuarioRepository : IUsuario
    {
        public async Task<Usuario> Alterar(Usuario usuario)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Usuario> BuscarPorID(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Usuario> Excluir(Usuario usuario)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<Usuario>> Listar()
        {
            throw new System.NotImplementedException();
        }

        public async Task<Usuario> Salvar(Usuario usuario)
        {
            throw new System.NotImplementedException();
        }
    }
}