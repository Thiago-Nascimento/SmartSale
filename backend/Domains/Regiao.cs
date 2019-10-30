using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Regiao
    {
        public Regiao()
        {
            Ong = new HashSet<Ong>();
            Usuario = new HashSet<Usuario>();
        }

        [Key]
        [Column("Id_Regiao")]
        public int IdRegiao { get; set; }
        [Required]
        [StringLength(255)]
        public string Bairro { get; set; }
        [Required]
        [StringLength(255)]
        public string Cidade { get; set; }

        [InverseProperty("IdRegiaoNavigation")]
        public virtual ICollection<Ong> Ong { get; set; }
        [InverseProperty("IdRegiaoNavigation")]
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
