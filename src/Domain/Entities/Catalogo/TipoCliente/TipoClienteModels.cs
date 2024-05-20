using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace AngelValdiviezoWebApi.Domain.Entities.Catalogo.TipoCliente
{
    [Table("tblTipoClienteLogisticStudio", Schema = "dbo")]
    public class TipoClienteModels
    {
        [Column("TpCl_Id", Order = 0, TypeName = "int")]
        [Key]
        public int TpClId { get; set; }

        [Column("TpCl_Descripcion", Order = 1, TypeName = "nvarchar")]
        public string TpClDescripcion { get; set; }

        [Column("TpCl_Activo", Order = 2, TypeName = "bit")]
        public bool TpClActivo { get; set; }

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
