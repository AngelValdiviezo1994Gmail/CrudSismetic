using Common.Domain.Wrappers;
using Module.Security.Infraestructure.DTO;
using Module.Security.Infraestructure.Interfaces.Client;
using Newtonsoft.Json;
using System.Text;

namespace Module.Security.Infraestructure.Client
{
    public class AutenticacionClient : IAutenticacionClient
    {
        private readonly HttpClient _httpClient;

        public AutenticacionClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Response<UserDTO>> Loggin(Request<LoginRequestDTO> request)
        {
            /*
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7203/");
                HttpResponseMessage response = await client.GetAsync("api/v1/Token/CreateToken");
                response.EnsureSuccessStatusCode();

                string responseData = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseData);
            }

            return new Response<UserDTO>();
            */

            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync("https://localhost:7203/api/v1/Token/CreateToken", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    //var resultModel = JsonConvert.DeserializeObject<MyDataModel>(responseData);
                    int var = 0;
                    // Procesar los datos recibidos
                    //return View(resultModel);
                }
                else
                {
                    // Manejar el error
                    //return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (Exception ex)
            {
                // Manejar la excepción
                //return StatusCode(500, ex.Message);
            }

            return new Response<UserDTO>();
        }
    }
}
