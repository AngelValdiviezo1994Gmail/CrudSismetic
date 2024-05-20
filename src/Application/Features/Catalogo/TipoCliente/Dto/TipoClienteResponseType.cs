using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Dto
{
    public class TipoClienteResponseType
    {
        [JsonPropertyName("mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
    }
}
