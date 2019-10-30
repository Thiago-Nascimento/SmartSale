using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    [Table("Tipo_Usuario")]
    public partial class TipoUsuario
    {
        public TipoUsuario()
        {
            Usuario = new HashSet<Usuario>();
        }

        [Key]
        [Column("Id_TipoUsuario")]
        public int IdTipoUsuario { get; set; }
        [Required]
        [StringLength(255)]
        public string Tipo { get; set; }

        [InverseProperty("IdTipoUsuarioNavigation")]
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
