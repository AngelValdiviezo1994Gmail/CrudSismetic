
namespace AngelValdiviezoWebApi.Domain.Dto
{
    public class ResponseCliente
    {
        public int ClientId { get; set; }
        public string ClientNombre { get; set; }
        public string ClientApellido { get; set; }
        public string ClientNumCta { get; set; }
        public int ClientSaldo { get; set; }
        public DateTime ClientFechaNacimiento { get; set; }
        public string ClientDireccion { get; set; }
        public string ClientTelefono { get; set; }
        public string ClientEmail { get; set; }
        public int ClientTipoId { get; set; }
        public int ClientEstadoCivilId { get; set; }
        public string ClientNumIdentificacion { get; set; }
        public string ClientProfesion { get; set; }
        public int ClientGeneroId { get; set; }
        public string ClientNacionalidad { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
