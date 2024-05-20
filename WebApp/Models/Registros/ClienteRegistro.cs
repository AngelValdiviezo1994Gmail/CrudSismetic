namespace WebApp.Models.Registros
{
    public class ClienteRegistro
    {
        public int idCliente { get; set; }

        public string nombreCliente { get; set; }

        public string apellidoCliente { get; set; }

        public string numCtaCliente { get; set; }

        public int saldoCliente { get; set; }

        public DateTime fechaNacimientoCliente { get; set; }

        public string direccionCliente { get; set; }

        public string telefonoCliente { get; set; }

        public string emailCliente { get; set; }

        public int idTipoCliente { get; set; }

        public int idEstadoCivilCliente { get; set; }

        public string numIdentificacionCliente { get; set; }

        public string profesionCliente { get; set; }

        public int idGeneroCliente { get; set; }

        public string nacionalidadCliente { get; set; }

        public string? usuarioCreacion { get; set; }

        public DateTime? fechaCreacion { get; set; }

        public string? usuarioModificacion { get; set; }

        public DateTime? fechaModificacion { get; set; }
    }
}
