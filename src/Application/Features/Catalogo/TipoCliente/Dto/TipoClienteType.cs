namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Dto
{
    public class TipoClienteType
    {
        public int TpClId { get; set; }
        public string TpClDescripcion { get; set; }
        public bool TpClActivo { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
