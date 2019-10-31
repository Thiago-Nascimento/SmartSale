using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Reserva
    {
        [Key]
        [Column("Id_Reserva")]
        public int IdReserva { get; set; }
        [Column("Quantidade_Comprada")]
        public int QuantidadeComprada { get; set; }
        [Column("Valor_Final")]
        public double ValorFinal { get; set; }
        [Column("Data_Limite_Retirada", TypeName = "date")]
        public DateTime DataLimiteRetirada { get; set; }
        [Column("Id_Usuario")]
        public int IdUsuario { get; set; }
        [Column("Id_Oferta")]
        public int IdOferta { get; set; }

        [ForeignKey(nameof(IdOferta))]
        [InverseProperty(nameof(Oferta.Reserva))]
        public virtual Oferta IdOfertaNavigation { get; set; }
        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Reserva))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
