using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Categoria
    {
        public Categoria()
        {
            Produto = new HashSet<Produto>();
        }

        [Key]
        [Column("Id_Categoria")]
        public int IdCategoria { get; set; }
        [Required]
        [Column("Nome_Categoria")]
        [StringLength(255)]
        public string NomeCategoria { get; set; }

        [InverseProperty("IdCategoriaNavigation")]
        public virtual ICollection<Produto> Produto { get; set; }
    }
}
