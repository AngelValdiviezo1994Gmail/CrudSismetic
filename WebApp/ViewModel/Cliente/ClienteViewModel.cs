using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApp.ViewModel
{
    public class ClienteViewModel
    {
        public int EditMode { get; set; }
        public int ClientId { get; set; }

        [DisplayName("Nombre")]
        public string ClientNombre { get; set; }

        [DisplayName("Apellido")]
        public string ClientApellido { get; set; }

        [DisplayName("Número de Cuenta")]
        public string ClientNumCta { get; set; }

        [DisplayName("Saldo")]
        public int ClientSaldo { get; set; }

        [DisplayName("Fecha de nacimiento")]
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy/MM/dd}")]
        public DateTime? ClientFechaNacimiento { get; set; }
        
        [DisplayName("Dirección")]
        public string ClientDireccion { get; set; }
        
        [DisplayName("Teléfono")]
        public string ClientTelefono { get; set; }

        
        [DisplayName("Correo")]
        public string ClientEmail { get; set; }

        [DisplayName("Tipo de Cliente")]
        public int ClientTipoId { get; set; }

        [DisplayName("Estado Civil")]
        public int ClientEstadoCivilId { get; set; }

        [DisplayName("Número Identificación")]
        public string ClientNumIdentificacion { get; set; }

        [DisplayName("Profesión")]
        public string ClientProfesion { get; set; }

        [DisplayName("Género")]
        public int ClientGeneroId { get; set; }

        [DisplayName("Nacionalidad")]
        public string ClientNacionalidad { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
