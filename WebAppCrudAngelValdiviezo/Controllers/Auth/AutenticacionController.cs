using Common.Domain.Wrappers;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebAppCrudAngelValdiviezo.Extensions;
using WebAppCrudAngelValdiviezo.ViewModel.Auth;
using Common.Domain.Interfaces;
using Module.Security.Infraestructure.Interfaces.Client;
using Module.Security.Infraestructure.DTO;

namespace WebAppCrudAngelValdiviezo.Controllers.Auth
{
    public class AutenticacionController : BaseController
    {
        private readonly IAutenticacionClient _autenticacionClient;
        private readonly IExecutionOrchestrator _executionOrchestrator;

        public async Task<ActionResult> Login()
        {
            return View(); //Si no existe se vuelve a mostrar LOGIN
            //return RedirectToAction(nameof(Index), RemoveController(nameof(HomeController))); //Enviamos a HOME
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel login)
        {
            if (ModelState.IsValid)
            {
                var loginDTO = _executionOrchestrator.Mapper.Map<LoginRequestDTO>(login);
                var response = await _autenticacionClient.Loggin(new Request<LoginRequestDTO>(loginDTO));

                if (response.Succeeded && response.Data != null)
                {
                    MensajeNotificaciones(new ConfiguracionMensaje { TipoMensaje = TipoMensaje.success.ToString(), Titulo = "BIENVENIDO/A ", Mensaje = response?.Data.UsuNombreCompleto ?? string.Empty });

                    return RedirectToAction(nameof(Index), RemoveController(nameof(HomeController)));
                }
                else
                {
                    MensajeNotificaciones(new ConfiguracionMensaje { TipoMensaje = TipoMensaje.error.ToString(), Titulo = "ERROR LOGIN", Mensaje = $"Error {response.ErrorCode} - {response.Error}" });
                    return RedirectToAction(nameof(Login));
                }
            }
            else
            {
                return RedirectToAction(nameof(Login));
            }

        }


    }
}
