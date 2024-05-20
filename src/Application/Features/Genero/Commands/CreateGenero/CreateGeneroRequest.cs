using System.Text.Json.Serialization;


namespace AngelValdiviezoWebApi.Application.Features.Genero.Commands.CreateGenero
{
    public class CreateGeneroRequest
    {
        [JsonPropertyName("GenId")]
        public int GenId { get; set; }

        [JsonPropertyName("GesDescripcion")]
        public string GesDescripcion { get; set; }

        [JsonPropertyName("GenActivo")]
        public bool GenActivo { get; set; }

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
