using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Domains
{
    public partial class BD_SmartSaleContext : DbContext
    {
        public BD_SmartSaleContext()
        {
        }

        public BD_SmartSaleContext(DbContextOptions<BD_SmartSaleContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<Doacao> Doacao { get; set; }
        public virtual DbSet<Oferta> Oferta { get; set; }
        public virtual DbSet<Ong> Ong { get; set; }
        public virtual DbSet<Produto> Produto { get; set; }
        public virtual DbSet<Regiao> Regiao { get; set; }
        public virtual DbSet<Reserva> Reserva { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuario { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
<<<<<<< HEAD
                optionsBuilder.UseSqlServer("Server=N-1S-DEV-09\\SQLEXPRESS; Database=BD_SmartSale; User Id=sa; Password=132;");
=======
                optionsBuilder.UseSqlServer("Server=N-1S-DEV-02\\SQLEXPRESS; Database=BD_SmartSale; User Id=sa; Password=132;");
>>>>>>> e4d952cdd208042e8a0498547cdb5f06ab32f250
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.IdCategoria)
                    .HasName("PK__Categori__CB90334923683C2F");

                entity.Property(e => e.NomeCategoria).IsUnicode(false);
            });

            modelBuilder.Entity<Doacao>(entity =>
            {
                entity.HasKey(e => e.IdDoacao)
                    .HasName("PK__Doacao__14ECF39DDF34BE45");

                entity.HasOne(d => d.IdOfertaNavigation)
                    .WithMany(p => p.Doacao)
                    .HasForeignKey(d => d.IdOferta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Doacao__Id_Ofert__4F7CD00D");

                entity.HasOne(d => d.IdOngNavigation)
                    .WithMany(p => p.Doacao)
                    .HasForeignKey(d => d.IdOng)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Doacao__Id_Ong__4E88ABD4");
            });

            modelBuilder.Entity<Oferta>(entity =>
            {
                entity.HasKey(e => e.IdOferta)
                    .HasName("PK__Oferta__6C9F2EA038499DC9");

                entity.Property(e => e.Cor).IsUnicode(false);

                entity.Property(e => e.Foto).IsUnicode(false);

                entity.HasOne(d => d.IdProdutoNavigation)
                    .WithMany(p => p.Oferta)
                    .HasForeignKey(d => d.IdProduto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Oferta__Id_Produ__440B1D61");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Oferta)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Oferta__Id_Usuar__44FF419A");
            });

            modelBuilder.Entity<Ong>(entity =>
            {
                entity.HasKey(e => e.IdOng)
                    .HasName("PK__Ong__50274C95F5500B07");

                entity.Property(e => e.Cnpj).IsUnicode(false);

                entity.Property(e => e.EmailOng).IsUnicode(false);

                entity.Property(e => e.EnderecoOng).IsUnicode(false);

                entity.Property(e => e.RazaoSocial).IsUnicode(false);

                entity.Property(e => e.SiteOng).IsUnicode(false);

                entity.Property(e => e.SobreOng).IsUnicode(false);

                entity.Property(e => e.TelefoneOng).IsUnicode(false);

                entity.HasOne(d => d.IdRegiaoNavigation)
                    .WithMany(p => p.Ong)
                    .HasForeignKey(d => d.IdRegiao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Ong__Id_Regiao__4BAC3F29");
            });

            modelBuilder.Entity<Produto>(entity =>
            {
                entity.HasKey(e => e.IdProduto)
                    .HasName("PK__Produto__94E704D85A02A8F4");

                entity.Property(e => e.NomeProduto).IsUnicode(false);

                entity.HasOne(d => d.IdCategoriaNavigation)
                    .WithMany(p => p.Produto)
                    .HasForeignKey(d => d.IdCategoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Produto__Id_Cate__412EB0B6");
            });

            modelBuilder.Entity<Regiao>(entity =>
            {
                entity.HasKey(e => e.IdRegiao)
                    .HasName("PK__Regiao__F9592B9B7A4B7C6A");

                entity.Property(e => e.Bairro).IsUnicode(false);

                entity.Property(e => e.Cidade).IsUnicode(false);
            });

            modelBuilder.Entity<Reserva>(entity =>
            {
                entity.HasKey(e => e.IdReserva)
                    .HasName("PK__Reserva__9E953BE1BFE1E250");

                entity.HasOne(d => d.IdOfertaNavigation)
                    .WithMany(p => p.Reserva)
                    .HasForeignKey(d => d.IdOferta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Reserva__Id_Ofer__48CFD27E");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Reserva)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Reserva__Id_Usua__47DBAE45");
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__Tipo_Usu__622D85ABC3C86B53");

                entity.Property(e => e.Tipo).IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuario__63C76BE269871D15");

                entity.Property(e => e.Cep).IsUnicode(false);

                entity.Property(e => e.Documento).IsUnicode(false);

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Endereco).IsUnicode(false);

                entity.Property(e => e.NomeUsuario).IsUnicode(false);

                entity.Property(e => e.RazaoSocial).IsUnicode(false);

                entity.Property(e => e.Senha).IsUnicode(false);

                entity.Property(e => e.Telefone).IsUnicode(false);

                entity.Property(e => e.Telefone2).IsUnicode(false);

                entity.HasOne(d => d.IdRegiaoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdRegiao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__Id_Regi__3E52440B");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__Id_Tipo__3D5E1FD2");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
