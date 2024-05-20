using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Cargo.DTO
{
    public class CargoResponseType
    {
        [JsonPropertyName("mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
    }
}
