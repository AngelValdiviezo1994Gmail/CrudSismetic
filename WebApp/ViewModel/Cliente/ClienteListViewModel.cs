using System.ComponentModel;
using WebAPP.Filters;

namespace WebApp.ViewModel
{
    public class ClienteListViewModel
    {
        public int ClientId { get; set; }

        [DisplayName("Id")]
        [TableField(DisplayOrden = 1)]
        public string? Id => ClientId.ToString();

        [DisplayName("Nombres")]
        [TableField(DisplayOrden = 2)]
        public string ClientNombre { get; set; }

        [DisplayName("Nombres")]
        [TableField(DisplayOrden = 3)]
        public string ClientApellido { get; set; }

        [DisplayName("Número de cuenta")]
        [TableField(DisplayOrden = 4)]
        public string ClientNumCta { get; set; }

        [DisplayName("Saldo")]
        [TableField(DisplayOrden = 5)]
        public int ClientSaldo { get; set; }

        [DisplayName("Fecha Nacimiento")]
        [TableField(DisplayOrden = 6)]
        public DateTime ClientFechaNacimiento { get; set; }

        [DisplayName("Dirección")]
        [TableField(DisplayOrden = 7)]
        public string ClientDireccion { get; set; }

        public string ClientTelefono { get; set; }

        public string ClientEmail { get; set; }

        public int ClientTipoId { get; set; }

        public int ClientEstadoCivilId { get; set; }

        public string ClientNumIdentificacion { get; set; }

        public string ClientProfesion { get; set; }

        public int ClientGeneroId { get; set; }

        public string ClientNacionalidad { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
