using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Produto
    {
        public Produto()
        {
            Oferta = new HashSet<Oferta>();
        }

        [Key]
        [Column("Id_Produto")]
        public int IdProduto { get; set; }
        [Required]
        [Column("Nome_Produto")]
        [StringLength(255)]
        public string NomeProduto { get; set; }
        public int? Pontos { get; set; }
        [Column("Id_Categoria")]
        public int IdCategoria { get; set; }

        [ForeignKey(nameof(IdCategoria))]
        [InverseProperty(nameof(Categoria.Produto))]
        public virtual Categoria IdCategoriaNavigation { get; set; }
        [InverseProperty("IdProdutoNavigation")]
        public virtual ICollection<Oferta> Oferta { get; set; }
    }
}
