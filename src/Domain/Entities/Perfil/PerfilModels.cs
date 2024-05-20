using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngelValdiviezoWebApi.Domain.Entities.Perfil
{
    [Table("tblPerfilSismetic", Schema = "dbo")]
    public class PerfilModels
    {
        [Column("idPerfil", Order = 0, TypeName = "int")]
        [Key]
        public int PerfilId { get; set; }

        [Column("nombrePerfil", Order = 1, TypeName = "nvarchar")]
        public string PerfilNombre { get; set; }

        [Column("usuarioCreacion", Order = 2, TypeName = "nvarchar")]
        public string? UsuarioCreacion { get; set; }

        [Column("fechaCreacion", Order = 3, TypeName = "datetime")]
        public DateTime? FechaCreacion { get; set; }

        [Column("usuarioModificacion", Order = 4, TypeName = "nvarchar")]
        public string? UsuarioModificacion { get; set; }

        [Column("fechaModificacion", Order = 5, TypeName = "datetime")]
        public DateTime? FechaModificacion { get; set; }
    }
}
