
namespace AngelValdiviezoWebApi.Domain.Constant
{
    public class Conexion
    {
        public string Puerto { get; }
        public string ApiToken { get; }
        public string ApiCliente { get; }
        public string ApiEstCivil { get; }
        public string ApiGenero { get; }
        public string ApiTipoCliente { get; }

        public Conexion()
        {
            this.Puerto = "https://localhost:7203";
            this.ApiToken = "/api/v1/Token/";
            this.ApiCliente = "/api/v1/Cliente/";
            this.ApiEstCivil = "/api/v1/EstadoCivil/";
            this.ApiGenero = "/api/v1/Genero/";
            this.ApiTipoCliente = "/api/v1/TipoCliente/";
        }
    }
}
