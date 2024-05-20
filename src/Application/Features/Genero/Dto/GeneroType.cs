
namespace AngelValdiviezoWebApi.Application.Features.Genero.Dto
{
    public class GeneroType
    {
        public int GenId { get; set; }

        public string GesDescripcion { get; set; }

        public bool GenActivo { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
