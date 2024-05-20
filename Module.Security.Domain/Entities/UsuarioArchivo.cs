namespace Module.Security.Domain.Entities
{
    public class UsuarioArchivo : User
    {
        public string estado { get; set; }
        public string observacion { get; set; }
        public int fila { get; set; }
        public bool esError { get; set; }
        public string TipoDocumento { get; set; }
        public string Genero { get; set; }
        public string EstadoCivil { get; set; }
        public string Ciudad { get; set; }
    }
}
