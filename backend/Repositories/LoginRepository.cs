using System.Linq;
using backend.Domains;
using backend.Interfaces;
using backend.ViewModels;

namespace backend.Repositories
{
    public class LoginRepository : ILogin
    {
        public Usuario AuthenticateUser (LoginViewModel login) {
            using(BD_SmartSaleContext _contexto = new BD_SmartSaleContext()){
                var usuario = _contexto.Usuario.FirstOrDefault (u => u.Email == login.Email && u.Senha == login.Senha);
                return usuario;
            }            
        }
    }
}