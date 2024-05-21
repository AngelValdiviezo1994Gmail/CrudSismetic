
namespace AngelValdiviezoWebApi.Application.Features.Cargo.DTO
{
    public class CargoType
    {
        public int CargoId { get; set; }

        public string CargoNombre { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
