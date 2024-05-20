using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngelValdiviezoWebApi.Domain.Entities.Genero
{
    [Table("tblGeneroLogisticStudio", Schema = "dbo")]
    public class GeneroModels
    {
        [Column("Gen_Id", Order = 0, TypeName = "int")]
        [Key]
        public int GenId { get; set; }

        [Column("Ges_Descripcion", Order = 1, TypeName = "nvarchar")]
        public string GesDescripcion { get; set; }

        [Column("Gen_Activo", Order = 2, TypeName = "bit")]
        public bool GenActivo { get; set; }

        [Column("usuarioCreacion", Order = 3, TypeName = "nvarchar")]
        public string? UsuarioCreacion { get; set; }

        [Column("fechaCreacion", Order = 4, TypeName = "datetime")]
        public DateTime? FechaCreacion { get; set; }

        [Column("usuarioModificacion", Order = 5, TypeName = "nvarchar")]
        public string? UsuarioModificacion { get; set; }

        [Column("fechaModificacion", Order = 6, TypeName = "datetime")]
        public DateTime? FechaModificacion { get; set; }
    }
}
