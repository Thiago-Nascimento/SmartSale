using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class UsuarioRepository : IUsuario {
        public async Task<Usuario> Alterar (Usuario usuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                _context.Entry (usuario).State = EntityState.Modified;
                await _context.SaveChangesAsync ();
            }
            return usuario;
        }
        
        public async Task<Usuario> BuscarPorID (int id) {
            Usuario usuario = new Usuario ();
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                usuario = await _context.Usuario.FindAsync (id);
                usuario.Email = null;
                usuario.Senha = null;

                return usuario;
            }
        }

        public async Task<Usuario> Excluir (Usuario usuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                _context.Usuario.Remove (usuario);
                await _context.SaveChangesAsync ();
                return usuario;
            }
        }

        public async Task<List<Usuario>> Listar () {
            List<Usuario> lista = new List<Usuario> ();
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                lista = await _context.Usuario.Include ("IdRegiaoNavigation").Include ("IdTipoUsuarioNavigation").ToListAsync ();

                for (int i = 0; i < lista.Count; i++) {
                    lista[i].Email = null;
                    lista[i].Senha = null;
                }

                return lista;
            }
        }

        public async Task<Usuario> Salvar (Usuario usuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {
                await _context.AddAsync (usuario);
                await _context.SaveChangesAsync ();

                return usuario;
            }
        }
        
        // Estava dando erro devido ao tipo do método que estava 'Task<Usuario>' e não bool, que é o retorno 
        public bool ValidaCPF (Usuario usuario) {
            using (BD_SmartSaleContext _context = new BD_SmartSaleContext ()) {

                bool resultado = false;
                int[] v1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };

                string cpfCalculo = "";
                int resto = 0, calculo = 0;

                string digito_v1 = "" , digito_v2 = "";

                //Filtro para retirar o Vazio, traço e ponto.
                usuario.Documento = usuario.Documento.Replace (" ", "");
                usuario.Documento = usuario.Documento.Replace ("-", "");
                usuario.Documento = usuario.Documento.Replace (".", "");

                //Filtro para contar os 9 digitos
                cpfCalculo = usuario.Documento.Substring(0, 9);

                //'Soma'
                for (int i = 0; i <= 8; i++) {
                    calculo += int.Parse (cpfCalculo[i].ToString ()) * v1[i];
                }

                //5 = resto da divisão do calculo
                resto = calculo % 11;

                //Calculo é 11 menos o resto = 5
                calculo = 11 - resto;

                if (calculo > 9) {
                    digito_v1 = "0";
                } else {
                    digito_v1 = calculo.ToString ();
                }

                if (digito_v1 == usuario.Documento[9].ToString ()) {
                    resultado = true;
                }

                int[] v2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
                resto = 0;

                cpfCalculo = cpfCalculo + calculo.ToString ();
                calculo = 0;

                for (int i = 0; i <= 9; i++) {
                    calculo += int.Parse (cpfCalculo[i].ToString ()) * v2[i];
                }

                resto = calculo % 11;
                calculo = 11 - resto;

                if (calculo > 9) {
                    digito_v2 = "0";
                } else {
                    digito_v2 = calculo.ToString ();
                }

                if (digito_v2 == usuario.Documento[10].ToString ()) {
                    resultado = true;
                }

                return resultado;
            }
        }

        public bool ValidaCNPJ(Usuario usuario) {
            using(BD_SmartSaleContext _context = new BD_SmartSaleContext()) {
                bool resultado = false;
            
                int[] v1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
                int[] v2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};            

                string cnpjCalculo = "";
                string digitoVerificador1 = "";
                string digitoVerificador2 = "";

                int calculo = 0;
                int resto = 0;

                usuario.Documento = usuario.Documento.Replace("/","");
                usuario.Documento = usuario.Documento.Replace(".","");
                usuario.Documento = usuario.Documento.Replace("-", "");
                usuario.Documento = usuario.Documento.Replace(" ", "");

                cnpjCalculo = usuario.Documento.Substring(0, 12);

                for(int i = 0; i < 12; i++) {
                    calculo = calculo + (int.Parse(cnpjCalculo[i].ToString()) * v1[i]);
                }

                resto = calculo % 11;
                calculo = 11 - resto;

                if(resto < 2) {
                    digitoVerificador1 = "0";
                } else {
                    digitoVerificador1 = calculo.ToString();
                }

                if(digitoVerificador1 == usuario.Documento[12].ToString()) {
                    resultado = true;
                }

                cnpjCalculo = cnpjCalculo + digitoVerificador1;

                resto = 0;
                calculo = 0;

                for(int i = 0; i < 13; i++) {
                    calculo = calculo + (int.Parse(cnpjCalculo[i].ToString()) * v2[i]);
                }

                resto = calculo % 11;
                calculo = 11 - resto;

                if(resto < 2) {
                    digitoVerificador2 = "0";
                } else {
                    digitoVerificador2 = calculo.ToString();
                }

                if(digitoVerificador2 == usuario.Documento[13].ToString()) {
                    resultado = true;
                } else {
                    resultado = false;
                }

                return resultado;
            }
        }
    }
}