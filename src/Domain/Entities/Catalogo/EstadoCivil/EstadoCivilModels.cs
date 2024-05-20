using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace AngelValdiviezoWebApi.Domain.Entities.Catalogo.EstadoCivil
{
    [Table("tblEstadoCivilLogisticStudio", Schema = "dbo")]
    public class EstadoCivilModels
    {
        [Column("EstCiv_Id", Order = 0, TypeName = "int")]
        [Key]
        public int EstCivId { get; set; }

        [Column("EstCiv_Descripcion", Order = 1, TypeName = "nvarchar")]
        public string EstCivDescripcion { get; set; }

        [Column("EstCiv_Activo", Order = 2, TypeName = "bit")]
        public bool EstCivActivo { get; set; }

        [Column("UsuarioCreacion", Order = 3, TypeName = "nvarchar")]
        public string? UsuarioCreacion { get; set; }

        [Column("FechaCreacion", Order = 4, TypeName = "datetime")]
        public DateTime? FechaCreacion { get; set; }

        [Column("UsuarioModificacion", Order = 5, TypeName = "nvarchar")]
        public string? UsuarioModificacion { get; set; }

        [Column("FechaModificacion", Order = 6, TypeName = "datetime")]
        public DateTime? FechaModificacion { get; set; }
    }
}
