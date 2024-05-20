namespace AngelValdiviezoWebApi.Domain.Dto
{
    public class ResponseCargo
    {
        public int CargotId { get; set; }

        public string CargoNombre { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
