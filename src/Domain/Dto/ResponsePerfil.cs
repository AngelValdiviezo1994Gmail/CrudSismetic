namespace AngelValdiviezoWebApi.Domain.Dto
{
    public class ResponsePerfil
    {
        public int PerfilId { get; set; }

        public string PerfilNombre { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
