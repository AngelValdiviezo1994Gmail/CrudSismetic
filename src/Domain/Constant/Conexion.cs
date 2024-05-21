
namespace AngelValdiviezoWebApi.Domain.Constant
{
    public class Conexion
    {
        public string Puerto { get; }
        public string ApiToken { get; }
        public string ApiUsuario { get; }
        public string ApiCargo { get; }
        public string ApiPerfil { get; }

        public Conexion()
        {
            this.Puerto = "https://localhost:7203";
            this.ApiToken = "/api/v1/Token/";
            this.ApiUsuario = "/api/v1/Usuario/";            
            this.ApiCargo = "/api/v1/Cargo/";            
            this.ApiPerfil = "/api/v1/Perfil/";            
        }
    }
}
