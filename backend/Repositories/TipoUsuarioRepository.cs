using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;

namespace backend.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuario
    {
        public async Task<TipoUsuario> Alterar(TipoUsuario tipoUsuario)
        {
            throw new System.NotImplementedException();
        }

        public async Task<TipoUsuario> BuscarPorID(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<TipoUsuario> Excluir(TipoUsuario tipoUsuario)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<TipoUsuario>> Listar()
        {
            throw new System.NotImplementedException();
        }

        public async Task<TipoUsuario> Salvar(TipoUsuario tipoUsuario)
        {
            throw new System.NotImplementedException();
        }
    }
}