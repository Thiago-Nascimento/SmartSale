using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Ong
    {
        public Ong()
        {
            Doacao = new HashSet<Doacao>();
        }

        [Key]
        [Column("Id_Ong")]
        public int IdOng { get; set; }
        [Required]
        [Column("Razao_Social")]
        [StringLength(255)]
        public string RazaoSocial { get; set; }
        [Required]
        [StringLength(255)]
        public string Cnpj { get; set; }
        [Column("Site_Ong")]
        [StringLength(255)]
        public string SiteOng { get; set; }
        [Column("Sobre_Ong")]
        [StringLength(255)]
        public string SobreOng { get; set; }
        [Required]
        [Column("Telefone_Ong")]
        [StringLength(255)]
        public string TelefoneOng { get; set; }
        [Column("Email_Ong")]
        [StringLength(255)]
        public string EmailOng { get; set; }
        [Required]
        [Column("Endereco_Ong")]
        [StringLength(255)]
        public string EnderecoOng { get; set; }
        [Column("Id_Regiao")]
        public int IdRegiao { get; set; }

        [ForeignKey(nameof(IdRegiao))]
        [InverseProperty(nameof(Regiao.Ong))]
        public virtual Regiao IdRegiaoNavigation { get; set; }
        [InverseProperty("IdOngNavigation")]
        public virtual ICollection<Doacao> Doacao { get; set; }
    }
}
