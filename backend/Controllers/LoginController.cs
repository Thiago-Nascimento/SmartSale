using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using backend.Domains;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase {
        //chamamos nosso contexto do banco
        BD_SmartSaleContext _context = new BD_SmartSaleContext ();
        //Definimos uma variavel para percorrer nossos metodos com a configuraçoes obtidas no appsettings.json
        private IConfiguration _config;

        // definimos um metodos construtor para poder passar essas configs
        public LoginController (IConfiguration config) {
            _config = config;
        }
        //Chamamos nosso metodo para validar o usuario da aplicação 
        private Usuario AuthenticateUser (Usuario login) {
            var usuario = _context.Usuario.FirstOrDefault (u => u.Email == login.Email && u.Senha == login.Senha);
            if (usuario != null) {
                usuario = login;
            }
            return usuario;

        }
        //Criamos nosso meotodo para gerar nosso token
        private string GenerateJSONWebToken (Usuario UserInfo) {
            var securityKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (_config["Jwt:Key"]));
            var credentials = new SigningCredentials (securityKey, SecurityAlgorithms.HmacSha256);
            //Definimos nossas claims (dados da seção) para poderem ser capturadas a qualquer momento enquanto o token for ativo
            var claims = new [] {
                new Claim (JwtRegisteredClaimNames.NameId, UserInfo.NomeUsuario),
                new Claim (JwtRegisteredClaimNames.Email, UserInfo.Email),
                new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid ().ToString ())
            };
            //configuramos nosso token e o nosso tempo de vida
            var token = new JwtSecurityToken (_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires : DateTime.Now.AddMinutes (120),
                signingCredentials : credentials);
            return new JwtSecurityTokenHandler ().WriteToken (token);

        }

        //usamos essa anotação para a ignorar a autenticação neste metodo já que ele é quem fara isso
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login ([FromBody] Usuario login) {
            IActionResult response = Unauthorized ();
            var user = AuthenticateUser (login);
            if (user != null) {
                var TokenString = GenerateJSONWebToken (user);
                response = Ok (new { token = TokenString });
            }
            return response;
        }

    }

}