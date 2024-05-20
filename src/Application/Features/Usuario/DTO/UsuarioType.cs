namespace AngelValdiviezoWebApi.Application.Features.Usuario.DTO
{
    public class UsuarioType
    {
        public int UsuarioId { get; set; }

        public int PerfilId { get; set; }

        public int CargoId { get; set; }

        public string UsuarioNombre { get; set; }

        public string UsuarioApellido { get; set; }

        public int UsuarioEdad { get; set; }

        public DateTime UsuarioFechaNacimiento { get; set; }

        public string UsuarioDireccion { get; set; }

        public bool UsuarioEstado { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
