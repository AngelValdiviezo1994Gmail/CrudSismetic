
namespace AngelValdiviezoWebApi.Domain.Dto
{
    public class ResponseEstadoCivil
    {
        public int EstCivId { get; set; }
        public string EstCivDescripcion { get; set; }
        public bool EstCivActivo { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
