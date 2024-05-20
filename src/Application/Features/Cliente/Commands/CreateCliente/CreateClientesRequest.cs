
using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Commands.CreateCliente
{
    public class CreateClientesRequest
    {
        [JsonPropertyName("idCliente")]
        public int ClientId { get; set; }

        [JsonPropertyName("nombreCliente")]
        public string ClientNombre { get; set; }

        [JsonPropertyName("apellidoCliente")]
        public string ClientApellido { get; set; }

        [JsonPropertyName("numCtaCliente")]
        public string ClientNumCta { get; set; }

        [JsonPropertyName("saldoCliente")]
        public int ClientSaldo { get; set; }

        [JsonPropertyName("fechaNacimientoCliente")]
        public DateTime ClientFechaNacimiento { get; set; }

        [JsonPropertyName("direccionCliente")]
        public string ClientDireccion { get; set; }

        [JsonPropertyName("telefonoCliente")]
        public string ClientTelefono { get; set; }

        [JsonPropertyName("emailCliente")]
        public string ClientEmail { get; set; }

        [JsonPropertyName("idTipoCliente")]
        public int ClientTipoId { get; set; }

        [JsonPropertyName("idEstadoCivilCliente")]
        public int ClientEstadoCivilId { get; set; }

        [JsonPropertyName("numIdentificacionCliente")]
        public string ClientNumIdentificacion { get; set; }

        [JsonPropertyName("profesionCliente")]
        public string ClientProfesion { get; set; }

        [JsonPropertyName("idGeneroCliente")]
        public int ClientGeneroId { get; set; }

        [JsonPropertyName("nacionalidadCliente")]
        public string ClientNacionalidad { get; set; }

        [JsonPropertyName("usuarioCreacion")]
        public string? UsuarioCreacion { get; set; }

        [JsonPropertyName("fechaCreacion")]
        public DateTime? FechaCreacion { get; set; }

        [JsonPropertyName("usuarioModificacion")]
        public string? UsuarioModificacion { get; set; }

        [JsonPropertyName("fechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
    }
}
