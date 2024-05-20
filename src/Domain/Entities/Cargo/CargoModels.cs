using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngelValdiviezoWebApi.Domain.Entities.Cargo
{
    [Table("tblCargoSismetic", Schema = "dbo")]
    public class CargoModels
    {
        [Column("idCargo", Order = 0, TypeName = "int")]
        [Key]
        public int CargotId { get; set; }

        [Column("nombreCargo", Order = 1, TypeName = "nvarchar")]
        public string CargoNombre { get; set; }

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
