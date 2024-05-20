using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.DTO
{
    public class UsuarioResponseType
    {
        [JsonPropertyName("mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
    }
}
