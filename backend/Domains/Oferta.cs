using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Oferta
    {
        public Oferta()
        {
            Doacao = new HashSet<Doacao>();
            Reserva = new HashSet<Reserva>();
        }

        [Key]
        [Column("Id_Oferta")]
        public int IdOferta { get; set; }
        public int Quantidade { get; set; }
        [Required]
        [StringLength(255)]
        public string Foto { get; set; }
        [StringLength(255)]
        public string Cor { get; set; }
        public double Preco { get; set; }
        [Required]
        [Column(TypeName = "text")]
        public string Descricao { get; set; }
        [Column("Data_Validade", TypeName = "date")]
        public DateTime DataValidade { get; set; }
        [Column("Id_Produto")]
        public int IdProduto { get; set; }
        [Column("Id_Usuario")]
        public int IdUsuario { get; set; }

        [ForeignKey(nameof(IdProduto))]
        [InverseProperty(nameof(Produto.Oferta))]
        public virtual Produto IdProdutoNavigation { get; set; }
        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Oferta))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
        [InverseProperty("IdOfertaNavigation")]
        public virtual ICollection<Doacao> Doacao { get; set; }
        [InverseProperty("IdOfertaNavigation")]
        public virtual ICollection<Reserva> Reserva { get; set; }
    }
}
