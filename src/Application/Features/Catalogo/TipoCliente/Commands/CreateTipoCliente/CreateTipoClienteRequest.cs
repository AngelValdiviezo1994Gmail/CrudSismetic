
using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Commands.CreateTipoCliente
{
    public class CreateTipoClienteRequest
    {
        [JsonPropertyName("TpClId")]
        public int TpClId { get; set; }

        [JsonPropertyName("TpClDescripcion")]
        public string TpClDescripcion { get; set; }

        [JsonPropertyName("TpClActivo")]
        public bool TpClActivo { get; set; }

        [JsonPropertyName("UsuarioCreacion")]
        public string? UsuarioCreacion { get; set; }

        [JsonPropertyName("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }

        [JsonPropertyName("UsuarioModificacion")]
        public string? UsuarioModificacion { get; set; }

        [JsonPropertyName("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
    }
}
