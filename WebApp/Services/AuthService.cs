using AngelValdiviezoWebApi.Domain.Constant;
using Newtonsoft.Json;
using System.Text;
using WebAppCrudAngelValdiviezo.ViewModel.Auth;

namespace WebApp.Services
{
    public class AuthService
    {
        private readonly HttpClient _httpClient;
        private readonly Conexion _Conexion;

        public AuthService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _Conexion = new Conexion();
        }

        public async Task<HttpResponseMessage> Login(LoginViewModel login)
        {
            var json = JsonConvert.SerializeObject(login);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiToken, "CreateToken");

                var response = await _httpClient.PostAsync(Ruta, content);

                return response;
            }
            catch(Exception ex)
            {
                return new HttpResponseMessage();
            }
        }
    }
}
