using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Oferta = new HashSet<Oferta>();
            Reserva = new HashSet<Reserva>();
        }

        [Key]
        [Column("Id_Usuario")]
        public int IdUsuario { get; set; }
        [Required]
        [Column("Nome_Usuario")]
        [StringLength(255)]
        public string NomeUsuario { get; set; }
        public int Idade { get; set; }
        [Required]
        [StringLength(255)]
        public string Documento { get; set; }
        [Column("Razao_Social")]
        [StringLength(255)]
        public string RazaoSocial { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(255)]
        public string Senha { get; set; }
        [Required]
        [StringLength(255)]
        public string Telefone { get; set; }
        [Column("Telefone_2")]
        [StringLength(255)]
        public string Telefone2 { get; set; }
        [Required]
        [StringLength(255)]
        public string Endereco { get; set; }
        [StringLength(255)]
        public string Cep { get; set; }
        public int Pontuacao { get; set; }
        [Column("Id_TipoUsuario")]
        public int IdTipoUsuario { get; set; }
        [Column("Id_Regiao")]
        public int IdRegiao { get; set; }

        [ForeignKey(nameof(IdRegiao))]
        [InverseProperty(nameof(Regiao.Usuario))]
        public virtual Regiao IdRegiaoNavigation { get; set; }
        [ForeignKey(nameof(IdTipoUsuario))]
        [InverseProperty(nameof(TipoUsuario.Usuario))]
        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Oferta> Oferta { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Reserva> Reserva { get; set; }
    }
}
