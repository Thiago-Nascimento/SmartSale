using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Doacao
    {
        [Key]
        [Column("Id_Doacao")]
        public int IdDoacao { get; set; }
        [Column("Id_Ong")]
        public int IdOng { get; set; }
        [Column("Id_Oferta")]
        public int IdOferta { get; set; }

        [ForeignKey(nameof(IdOferta))]
        [InverseProperty(nameof(Oferta.Doacao))]
        public virtual Oferta IdOfertaNavigation { get; set; }
        [ForeignKey(nameof(IdOng))]
        [InverseProperty(nameof(Ong.Doacao))]
        public virtual Ong IdOngNavigation { get; set; }
    }
}
