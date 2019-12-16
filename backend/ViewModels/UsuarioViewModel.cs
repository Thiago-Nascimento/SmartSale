using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains {
    public partial class UsuarioViewModel {

        public int IdUsuario { get; set; }

        [StringLength (255)]
        public string NomeUsuario { get; set; }
        public int Idade { get; set; }

        [StringLength (255)]
        public string Documento { get; set; }

        [StringLength (255)]
        public string RazaoSocial { get; set; }

        [StringLength (255)]
        public string Email { get; set; }

        [StringLength (255)]
        public string FotoUsuario { get; set; }

        [StringLength (255)]
        public string Senha { get; set; }

        [StringLength (255)]
        public string Telefone { get; set; }

        [StringLength (255)]
        public string Telefone2 { get; set; }

        [StringLength (255)]
        public string Endereco { get; set; }

        [StringLength (255)]
        public string Cep { get; set; }
        public int Pontuacao { get; set; }
        public int IdTipoUsuario { get; set; }
        public int IdRegiao { get; set; }
    }

}