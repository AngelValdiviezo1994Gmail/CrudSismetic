using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngelValdiviezoWebApi.Domain.Entities.Usuario
{
    [Table("tblUsuariosSismetic", Schema = "dbo")]
    public class UsuarioModels
    {
        [Column("idUsuario", Order = 0, TypeName = "int")]
        [Key]
        public int UsuarioId { get; set; }

        [Column("idPerfil", Order = 1, TypeName = "int")]
        public int PerfilId { get; set; }

        [Column("idCargo", Order = 2, TypeName = "int")]
        public int CargoId { get; set; }

        [Column("nombreUsuario", Order = 3, TypeName = "nvarchar")]
        public string UsuarioNombre { get; set; }

        [Column("apellidoUsuario", Order = 4, TypeName = "nvarchar")]
        public string UsuarioApellido { get; set; }

        [Column("edadUsuario", Order = 5, TypeName = "int")]
        public int UsuarioEdad { get; set; }

        [Column("fechaNacimientoUsuario", Order = 6, TypeName = "datetime")]
        public DateTime UsuarioFechaNacimiento { get; set; }

        [Column("direccionUsuario", Order = 7, TypeName = "nvarchar")]
        public string UsuarioDireccion { get; set; }

        [Column("estadoUsuario", Order = 8, TypeName = "bit")]
        public bool UsuarioEstado { get; set; }

        [Column("usuarioCreacion", Order = 9, TypeName = "nvarchar")]
        public string? UsuarioCreacion { get; set; }

        [Column("fechaCreacion", Order = 10, TypeName = "datetime")]
        public DateTime? FechaCreacion { get; set; }

        [Column("usuarioModificacion", Order = 11, TypeName = "nvarchar")]
        public string? UsuarioModificacion { get; set; }

        [Column("fechaModificacion", Order = 12, TypeName = "datetime")]
        public DateTime? FechaModificacion { get; set; }
    }
}
