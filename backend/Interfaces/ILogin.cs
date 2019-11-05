using backend.Domains;
using backend.ViewModels;

namespace backend.Interfaces
{
    public interface ILogin
    {
         Usuario AuthenticateUser(LoginViewModel login);
    }
}