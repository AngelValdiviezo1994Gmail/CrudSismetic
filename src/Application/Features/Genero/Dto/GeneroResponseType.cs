using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Genero.Dto
{
    public class GeneroResponseType
    {
        [JsonPropertyName("mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
    }
}
