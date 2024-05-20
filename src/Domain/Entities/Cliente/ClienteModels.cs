using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngelValdiviezoWebApi.Domain.Entities.Cliente
{
    [Table("tblClienteLogisticStudio", Schema = "dbo")]
    public class ClienteModels
    {
        [Column("idCliente", Order = 0, TypeName = "int")]
        [Key]
        public int ClientId { get; set; }

        [Column("nombreCliente", Order = 1, TypeName = "nvarchar")]
        public string ClientNombre { get; set; }

        [Column("apellidoCliente", Order = 2, TypeName = "nvarchar")]
        public string ClientApellido { get; set; }

        [Column("numCtaCliente", Order = 3, TypeName = "nvarchar")]
        public string ClientNumCta { get; set; }

        [Column("saldoCliente", Order = 4, TypeName = "int")]
        public int ClientSaldo { get; set; }

        [Column("fechaNacimientoCliente", Order = 5, TypeName = "datetime")]
        public DateTime ClientFechaNacimiento { get; set; }

        [Column("direccionCliente", Order = 6, TypeName = "nvarchar")]
        public string ClientDireccion { get; set; }

        [Column("telefonoCliente", Order = 7, TypeName = "nvarchar")]
        public string ClientTelefono { get; set; }

        [Column("emailCliente", Order = 8, TypeName = "nvarchar")]
        public string ClientEmail { get; set; }

        [Column("idTipoCliente", Order = 9, TypeName = "int")]
        public int ClientTipoId { get; set; }

        [Column("idEstadoCivilCliente", Order = 10, TypeName = "int")]
        public int ClientEstadoCivilId { get; set; }

        [Column("numIdentificacionCliente", Order = 11, TypeName = "nvarchar")]
        public string ClientNumIdentificacion { get; set; }

        [Column("profesionCliente", Order = 12, TypeName = "nvarchar")]
        public string ClientProfesion { get; set; }

        [Column("idGeneroCliente", Order = 13, TypeName = "int")]
        public int ClientGeneroId { get; set; }

        [Column("nacionalidadCliente", Order = 14, TypeName = "nvarchar")]
        public string ClientNacionalidad { get; set; }

        [Column("usuarioCreacion", Order = 15, TypeName = "nvarchar")]
        public string? UsuarioCreacion { get; set; }

        [Column("fechaCreacion", Order = 16, TypeName = "datetime")]
        public DateTime? FechaCreacion { get; set; }

        [Column("usuarioModificacion", Order = 17, TypeName = "nvarchar")]
        public string? UsuarioModificacion { get; set; }

        [Column("fechaModificacion", Order = 18, TypeName = "datetime")]
        public DateTime? FechaModificacion { get; set; }
    }
}
