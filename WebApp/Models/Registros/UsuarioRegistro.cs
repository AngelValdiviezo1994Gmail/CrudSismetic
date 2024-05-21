namespace WebApp.Models.Registros
{
    public class UsuarioRegistro
    {
        public int idUsuario { get; set; }

        public int idPerfil { get; set; }

        public int idCargo { get; set; }

        public string nombreUsuario { get; set; }

        public string apellidoUsuario { get; set; }

        public int edadUsuario { get; set; }

        public DateTime fechaNacimientoUsuario { get; set; }

        public string direccionUsuario { get; set; }

        public bool estadoUsuario { get; set; }

        public string? usuarioCreacion { get; set; }

        public DateTime? fechaCreacion { get; set; }

        public string? usuarioModificacion { get; set; }

        public DateTime? fechaModificacion { get; set; }
    }
}
