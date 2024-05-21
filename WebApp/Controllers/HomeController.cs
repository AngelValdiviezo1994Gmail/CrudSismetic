using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.DTO;
using AngelValdiviezoWebApi.Domain.Entities;
using AngelValdiviezoWebApi.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using WebApp.Controllers.Usuarios;
using WebApp.Models;
using WebApp.Services;
using WebApp.ViewModel;
using WebApp.ViewModel.Usuario;
using WebAPP.Filters;
using static WebAppCrudAngelValdiviezo.Extensions.BaseController;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, HttpClient httpClient)
            => (
            _logger,
            _httpClient
            )
            =
            (
            logger,
            httpClient);


        public async Task<IActionResult> Index(string? op)
        {
            ResponsePaged<List<UsuarioListViewModel>> LstFinal = new ResponsePaged<List<UsuarioListViewModel>>();
            Usuario_Service OClientService = new Usuario_Service(_httpClient);

            OpcionesTablaViewModel opciones = TableViewHelper.GetParametros(op);
            
            List<Filtro> filtros = new();

            RequestPaged getGeneroRequest = new(filtros)
            {
                Cantidad = opciones.cantidadMostrar.HasValue ? opciones.cantidadMostrar.Value : 10,
                Pagina = opciones.pagina.HasValue ? opciones.pagina.Value : 1,
            };

            if (!string.IsNullOrWhiteSpace(opciones.propiedadOrden) && opciones.tipoOrden != null)
            {
                getGeneroRequest.Orden = new OrdenFiltro
                {
                    PropiedadBusqueda = opciones.propiedadOrden,
                    Orden = (OrdenFiltroEnum)opciones.tipoOrden
                };
            }

            List<UsuarioType> LstUsuarios = new List<UsuarioType>();

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            var response = await OClientService.GetUsuarios(Token);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                
                LstUsuarios = JsonConvert.DeserializeObject<ResponseType<List<UsuarioType>>>(responseData).Data;

                if(LstUsuarios == null)
                {
                    LstUsuarios = new List<UsuarioType>();
                }

                var OConvertido = new ResponsePaged<List<UsuarioType>>
                {
                    Succeeded = true,
                    Error = string.Empty,
                    ErrorCode = 0,
                    Data = LstUsuarios,
                    Cantidad = LstUsuarios?.Count ?? 0,
                    Pagina = 1,
                    TotalElementos = LstUsuarios?.Count ?? 0,
                    TotalPaginas = LstUsuarios != null && LstUsuarios.Count > 0 ? LstUsuarios.Count / 5 : 0, 
                };
                List<UsuarioListViewModel> LstTmp = new List<UsuarioListViewModel>();

                foreach (UsuarioType item in LstUsuarios)
                {
                    LstTmp.Add(
                        new UsuarioListViewModel 
                        {
                            CargoId = item.CargoId,
                            UsuarioNombre = item.UsuarioNombre,
                            PerfilId = item.PerfilId,
                            UsuarioApellido = item.UsuarioApellido,
                            UsuarioDireccion = item.UsuarioDireccion,
                            UsuarioEdad = item.UsuarioEdad,
                            UsuarioEstado = item.UsuarioEstado,
                            UsuarioFechaNacimiento = item.UsuarioFechaNacimiento,
                            UsuarioId = item.UsuarioId,
                            FechaCreacion = item.FechaCreacion,
                            FechaModificacion = item.FechaModificacion,
                            UsuarioCreacion = item.UsuarioCreacion,
                            UsuarioModificacion = item.UsuarioModificacion
                        }
                        );
                }
                
                LstFinal.Data = LstTmp;
            }

            return View(LstFinal);
        }

        public IActionResult VerDetalle(int? id)
        {
            HttpContext.Session.SetString("IdUsuarioDet", id?.ToString() ?? "0");
            return RedirectToAction(nameof(VerDetalle), RemoveController(nameof(UsuariosController)));
        }

        public IActionResult Create()        
        {
            return RedirectToAction(nameof(Create), RemoveController(nameof(UsuariosController)));
        }

        public IActionResult Edit(int? id)
        {
            HttpContext.Session.SetString("IdUsuario", id?.ToString() ?? "0");

            return RedirectToAction(nameof(Edit), RemoveController(nameof(UsuariosController)));
        }

        public IActionResult Privacy()
        {
            return View();
        }


        [AuthorizationFilter]
        public IActionResult EnConstruccion()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public async Task<JsonResult> Inactivar(int id)
        {
            if (id == 0)
                return Json(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.success.ToString(),
                    Titulo = "ELIMINACIÓN DE USUARIO",
                    Mensaje = $"No se ha elegido un usuario."
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
                    Mensaje = $"Error al eliminar el usuario"
                });
            }


        }


        #region Funciones
        public string RemoveController(string value)
        {
            string result = value.Replace("Controller", "");

            return result;
        }
        #endregion
    }
}