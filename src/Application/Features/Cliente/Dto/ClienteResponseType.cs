using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Dto
{
    public class ClienteResponseType
    {
        [JsonPropertyName("mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
    }
}
