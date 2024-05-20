
namespace Module.Security.Infraestructure.DTO
{
    public class LoginRequestDTO
    {
        public int IdUsuario { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Identificacion { get; set; }
        public string hashUsuario { get; set; }

        public int? IdEsc { get; set; }
        public bool reqToken { get; set; }
    }
}
