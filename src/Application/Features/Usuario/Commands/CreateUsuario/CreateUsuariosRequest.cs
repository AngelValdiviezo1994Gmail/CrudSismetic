using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Commands.CreateUsuario
{
    public class CreateUsuariosRequest
    {
        [JsonPropertyName("idUsuario")]
        public int UsuarioId { get; set; }

        [JsonPropertyName("idPerfil")]
        public int PerfilId { get; set; }

        [JsonPropertyName("idCargo")]
        public int CargoId { get; set; }

        [JsonPropertyName("nombreUsuario")]
        public string UsuarioNombre { get; set; }

        [JsonPropertyName("apellidoUsuario")]
        public string UsuarioApellido { get; set; }

        [JsonPropertyName("edadUsuario")]
        public int UsuarioEdad { get; set; }

        [JsonPropertyName("fechaNacimientoUsuario")]
        public DateTime UsuarioFechaNacimiento { get; set; }

        [JsonPropertyName("direccionUsuario")]
        public string UsuarioDireccion { get; set; }

        [JsonPropertyName("estadoUsuario")]
        public bool UsuarioEstado { get; set; }

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
