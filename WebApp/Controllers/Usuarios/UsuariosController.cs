using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using WebAppCrudAngelValdiviezo.Extensions;
using WebApp.ViewModel.Usuario;
using WebApp.Utils;
using WebApp.Services;
using AngelValdiviezoWebApi.Application.Features.Cargo.DTO;
using AngelValdiviezoWebApi.Application.Features.Perfil.DTO;

namespace WebApp.Controllers.Usuarios
{
    public class UsuariosController : BaseController
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<UsuariosController> _logger;

        public UsuariosController(ILogger<UsuariosController> logger, HttpClient httpClient)
            => (
            _logger,
            _httpClient
            )
            =
            (
            logger,
            httpClient);
        
        public async Task<IActionResult> Index()
        {
            return RedirectToAction(nameof(Index), RemoveController(nameof(HomeController)));
        }

        public async Task<IActionResult> Create()
        {
            CargaListas();
            UsuarioViewModel oUsuario = new();
            oUsuario.UsuarioId = 0;
            oUsuario.EditMode = 1;
            return View(oUsuario);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UsuarioViewModel oUsuario)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    CargaListas();
                    oUsuario.EditMode = 1;
                    oUsuario.UsuarioId = 0;
                    return View(oUsuario);
                }

                UsuarioType nuevoUsuario = new UsuarioType
                {
                    UsuarioId = 0,
                    CargoId = oUsuario.CargoId,
                    PerfilId = oUsuario.PerfilId,
                    UsuarioApellido = oUsuario.UsuarioApellido,
                    UsuarioDireccion = oUsuario.UsuarioDireccion,
                    UsuarioEdad = oUsuario.UsuarioEdad,
                    UsuarioEstado = oUsuario.UsuarioEstado,
                    UsuarioFechaNacimiento = oUsuario.UsuarioFechaNacimiento ?? DateTime.Now,
                    UsuarioNombre = oUsuario.UsuarioNombre,
                    UsuarioCreacion = "Angel Valdiviezo",
                    FechaCreacion = DateTime.Now,
                    UsuarioModificacion = "",
                    FechaModificacion = DateTime.Now
                };

                string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

                Usuario_Service OClientService = new Usuario_Service(_httpClient);

                var response = await OClientService.CreateUsuario(nuevoUsuario, Token);

                if (response.IsSuccessStatusCode)
                {
                    MensajeNotificaciones(new ConfiguracionMensaje
                    {
                        TipoMensaje = TipoMensaje.success.ToString(),
                        Titulo = "CREACIÓN DE USUARIO",
                        Mensaje = $"Creación de Usuario con éxito."
                    });
                }
                else
                {
                    MensajeNotificaciones(new ConfiguracionMensaje
                    {
                        TipoMensaje = TipoMensaje.error.ToString(),
                        Titulo = "CREACIÓN DE USUARIO",
                        Mensaje = $"Error al crear el Usuario"
                    });

                    CargaListas();
                    oUsuario.EditMode = 1;
                    oUsuario.UsuarioId = 0;
                    return View(oUsuario);
                }

                return RedirectToAction(nameof(Index), RemoveController(nameof(HomeController)));
            }
            catch (Exception ex)
            {
                MensajeNotificaciones(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.error.ToString(),
                    Titulo = "CREACIÓN DE USUARIO",
                    Mensaje = $"Error {ex}"
                });
                CargaListas();
                return View(oUsuario);
            }
        }

        public async Task<IActionResult> Edit()
        {
            string id = HttpContext.Session.GetString("IdUsuario") ?? "";

            if (id == null)
            {
                return NotFound();
            }
            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            Usuario_Service OClientService = new Usuario_Service(_httpClient);
            var response = await OClientService.GetUsuarioById(Token, id);
            UsuarioType ObjClient = new UsuarioType();

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                ObjClient = JsonConvert.DeserializeObject<ResponseType<UsuarioType>>(responseData).Data;
            }

            UsuarioViewModel ObjUsuarioEditViewModel = new UsuarioViewModel
            {
                UsuarioId = ObjClient.UsuarioId,
                CargoId = ObjClient.CargoId,
                PerfilId = ObjClient.PerfilId,
                UsuarioApellido = ObjClient.UsuarioApellido,
                UsuarioDireccion = ObjClient.UsuarioDireccion,
                UsuarioEdad = ObjClient.UsuarioEdad,
                UsuarioEstado = ObjClient.UsuarioEstado,
                UsuarioFechaNacimiento = ObjClient.UsuarioFechaNacimiento,
                UsuarioNombre = ObjClient.UsuarioNombre,
                UsuarioCreacion = "Angel_Valdiviezo",
                FechaCreacion = DateTime.Now,
                UsuarioModificacion = "Angel_Valdiviezo",
                FechaModificacion = DateTime.Now
            };

            ObjUsuarioEditViewModel.EditMode = 1;
            CargaListas();
            return View(ObjUsuarioEditViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(UsuarioViewModel oUsuario)
        {
            if (!ModelState.IsValid)
            {
                CargaListas();
                oUsuario.EditMode = 1;
                return View(oUsuario);
            }

            string id = HttpContext.Session.GetString("IdUsuario") ?? "0";

            UsuarioType nuevoUsuario = new UsuarioType
            {
                UsuarioId = oUsuario.UsuarioId,
                CargoId = oUsuario.CargoId,
                PerfilId = oUsuario.PerfilId,
                UsuarioApellido = oUsuario.UsuarioApellido,
                UsuarioDireccion = oUsuario.UsuarioDireccion,
                UsuarioEdad = oUsuario.UsuarioEdad,
                UsuarioEstado = oUsuario.UsuarioEstado,
                UsuarioFechaNacimiento = oUsuario.UsuarioFechaNacimiento ?? DateTime.Now,
                UsuarioNombre = oUsuario.UsuarioNombre,
                UsuarioCreacion = "Angel_Valdiviezo",
                FechaCreacion = DateTime.Now,
                UsuarioModificacion = "Angel_Valdiviezo",
                FechaModificacion = DateTime.Now
            };

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            Usuario_Service OClientService = new Usuario_Service(_httpClient);

            var response = await OClientService.UpdateUsuario(nuevoUsuario, Token);

            if (response.IsSuccessStatusCode)
            {
                MensajeNotificaciones(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.success.ToString(),
                    Titulo = "EDICIÓN DE USUARIO",
                    Mensaje = $"Edición de Usuario con éxito."
                });
            }
            else
            {
                MensajeNotificaciones(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.error.ToString(),
                    Titulo = "EDICIÓN DE USUARIO",
                    Mensaje = $"Error al editar el Usuario"
                });
            }

            return RedirectToAction(nameof(Index), RemoveController(nameof(HomeController)));
        }

        public async Task<IActionResult> VerDetalle()
        {
            string id = HttpContext.Session.GetString("IdUsuarioDet") ?? "";

            if (id == null)
            {
                return NotFound();
            }
            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            Usuario_Service OClientService = new Usuario_Service(_httpClient);
            var response = await OClientService.GetUsuarioById(Token, id);
            UsuarioType oUsuario = new UsuarioType();

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                oUsuario = JsonConvert.DeserializeObject<ResponseType<UsuarioType>>(responseData).Data;
            }

            UsuarioViewModel ObjUsuarioEditViewModel = new UsuarioViewModel
            {
                UsuarioId = oUsuario.UsuarioId,
                CargoId = oUsuario.CargoId,
                PerfilId = oUsuario.PerfilId,
                UsuarioApellido = oUsuario.UsuarioApellido,
                UsuarioDireccion = oUsuario.UsuarioDireccion,
                UsuarioEdad = oUsuario.UsuarioEdad,
                UsuarioEstado = oUsuario.UsuarioEstado,
                UsuarioFechaNacimiento = oUsuario.UsuarioFechaNacimiento,
                UsuarioNombre = oUsuario.UsuarioNombre,
                UsuarioCreacion = "Angel_Valdiviezo",
                FechaCreacion = DateTime.Now,
                UsuarioModificacion = "Angel_Valdiviezo",
                FechaModificacion = DateTime.Now
            };

            ObjUsuarioEditViewModel.EditMode = 1;
            CargaListas();
            return View(ObjUsuarioEditViewModel);
        }

        [HttpPost]
        public async Task<JsonResult> Inactivar(int id)
        {
            if (id == 0)
                return Json(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.success.ToString(),
                    Titulo = "ELIMINACIÓN DE USUARIO",
                    Mensaje = $"No se ha elegido un Usuario."
                });

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            Usuario_Service OClientService = new Usuario_Service(_httpClient);

            var response = await OClientService.DeleteUsuario(id, Token);

            if (response.IsSuccessStatusCode)
            {
                return Json(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.success.ToString(),
                    Titulo = "ELIMINACIÓN DE USUARIO",
                    Mensaje = $"Usuario fue eliminado con éxito."
                });
            }
            else
            {
                return Json(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.error.ToString(),
                    Titulo = "ELIMINACIÓN DE USUARIO",
                    Mensaje = $"Error al eliminar el Usuario"
                });
            }


        }

        #region Funciones
        private void CargaListas()
        {
            var LstPerfiles = CargaLstPerfiles();
            var LstCargos = CargaLstCargos();

            ViewData["ListaPerfiles"] = new SelectList(LstPerfiles.Result, "PerfilId", "PerfilNombre", 1);
            ViewData["ListaCargos"] = new SelectList(LstCargos.Result, "CargoId", "CargoNombre", 1);
            ViewData["ListaEstados"] = new SelectList(EstadoBoolViewModel.ListarEstadosBool(), "Valor", "Texto", 1);
        }

        private async Task<List<PerfilType>> CargaLstPerfiles()
        {
            Usuario_Service OClientService = new Usuario_Service(_httpClient);

            List<PerfilType> LstGeneros = new List<PerfilType>();

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            var response = await OClientService.GetListaPerfiles(Token);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                LstGeneros = JsonConvert.DeserializeObject<ResponseType<List<PerfilType>>>(responseData).Data;

            }

            return LstGeneros;
        }

        private async Task<List<CargoType>> CargaLstCargos()
        {
            Usuario_Service OClientService = new Usuario_Service(_httpClient);

            List<CargoType> LstGeneros = new List<CargoType>();

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            var response = await OClientService.GetListaCargo(Token);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                LstGeneros = JsonConvert.DeserializeObject<ResponseType<List<CargoType>>>(responseData).Data;

            }

            return LstGeneros;
        }


        public void MensajeNotificaciones(ConfiguracionMensaje ConfMensaje)
        {
            TempData["Message"] = JsonConvert.SerializeObject(ConfMensaje);
        }
        #endregion


    }
}
