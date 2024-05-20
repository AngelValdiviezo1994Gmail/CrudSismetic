using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using WebAPP.Filters;
using WebApp.Services;
using WebApp.ViewModel;
using WebAppCrudAngelValdiviezo.Extensions;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Catalogo.EstadoCivil.Dto;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Dto;
using AngelValdiviezoWebApi.Application.Features.Genero.Dto;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using AngelValdiviezoWebApi.Persistence.Repository.Cliente;
using NuGet.Common;

namespace WebApp.Controllers.Clientes
{
    public class ClientesController : BaseController
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ClientesController> _logger;

        public ClientesController(ILogger<ClientesController> logger, HttpClient httpClient)
            => (
            _logger,
            _httpClient
            )
            =
            (
            logger,
            httpClient);

        public async Task<IActionResult> Create()
        {
            CargaListas();
            ClienteViewModel oCliente = new();
            oCliente.ClientId = 0;
            oCliente.EditMode = 1;
            return View(oCliente);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ClienteViewModel oCliente)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    CargaListas();
                    oCliente.EditMode = 1;
                    oCliente.ClientId = 0;
                    return View(oCliente);
                }

                ClienteType nuevoCliente = new ClienteType
                {
                    ClientId = 0,
                    ClientApellido = oCliente.ClientApellido,
                    ClientDireccion = oCliente.ClientDireccion,
                    ClientEmail = oCliente.ClientEmail,
                    ClientEstadoCivilId = oCliente.ClientEstadoCivilId,
                    ClientFechaNacimiento = oCliente.ClientFechaNacimiento ?? DateTime.Now,
                    ClientGeneroId = oCliente.ClientGeneroId,
                    ClientNacionalidad = oCliente.ClientNacionalidad,
                    ClientNombre = oCliente.ClientNombre,
                    ClientNumCta = oCliente.ClientNumCta,
                    ClientNumIdentificacion = oCliente.ClientNumIdentificacion,
                    ClientProfesion = oCliente.ClientProfesion,
                    ClientSaldo = oCliente.ClientSaldo,
                    ClientTelefono = oCliente.ClientTelefono,
                    ClientTipoId = oCliente.ClientTipoId,
                    UsuarioCreacion = "Angel Valdiviezo",
                    FechaCreacion = DateTime.Now,
                    UsuarioModificacion = "",
                    FechaModificacion = DateTime.Now
                };

                string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

                Cliente_Service OClientService = new Cliente_Service(_httpClient);

                var response = await OClientService.CreateCliente(nuevoCliente, Token);

                if (response.IsSuccessStatusCode)
                {
                    MensajeNotificaciones(new ConfiguracionMensaje
                    {
                        TipoMensaje = TipoMensaje.success.ToString(),
                        Titulo = "CREACIÓN DE CLIENTE",
                        Mensaje = $"Creación de CLIENTE con éxito."
                    });
                }
                else
                {
                    MensajeNotificaciones(new ConfiguracionMensaje
                    {
                        TipoMensaje = TipoMensaje.error.ToString(),
                        Titulo = "CREACIÓN DE CLIENTE",
                        Mensaje = $"Error al crear el cliente"
                    });

                    CargaListas();
                    oCliente.EditMode = 1;
                    oCliente.ClientId = 0;
                    return View(oCliente);
                }

                return RedirectToAction(nameof(Index), RemoveController(nameof(HomeController)));
            }
            catch (Exception ex)
            {
                MensajeNotificaciones(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.error.ToString(),
                    Titulo = "CREACIÓN DE CLIENTE",
                    Mensaje = $"Error {ex}"
                });
                CargaListas();
                return View(oCliente);
            }
        }

        public async Task<IActionResult> Edit()
        {
            string id = HttpContext.Session.GetString("IdCliente") ?? "";

            if (id == null)
            {
                return NotFound();
            }
            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            Cliente_Service OClientService = new Cliente_Service(_httpClient);
            var response = await OClientService.GetClienteById(Token, id);
            ClienteType ObjClient = new ClienteType();

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                ObjClient = JsonConvert.DeserializeObject<ResponseType<ClienteType>>(responseData).Data;
            }

            ClienteViewModel ObjClienteEditViewModel = new ClienteViewModel
            {
                ClientApellido = ObjClient.ClientApellido,
                ClientDireccion = ObjClient.ClientDireccion,
                ClientEmail = ObjClient.ClientEmail,
                ClientEstadoCivilId = ObjClient.ClientEstadoCivilId,
                ClientFechaNacimiento = ObjClient.ClientFechaNacimiento,
                ClientGeneroId = ObjClient.ClientGeneroId,
                ClientId = ObjClient.ClientId,
                ClientNacionalidad = ObjClient.ClientNacionalidad,
                ClientNombre = ObjClient.ClientNombre,
                ClientNumCta = ObjClient.ClientNumCta,
                ClientNumIdentificacion = ObjClient.ClientNumIdentificacion,
                ClientProfesion = ObjClient.ClientProfesion,
                ClientSaldo = ObjClient.ClientSaldo,
                ClientTelefono = ObjClient.ClientTelefono,
                ClientTipoId = ObjClient.ClientTipoId,
                FechaCreacion = ObjClient.FechaCreacion,
                UsuarioCreacion = ObjClient.UsuarioCreacion,                
            };

            ObjClienteEditViewModel.EditMode = 1;
            CargaListas();
            return View(ObjClienteEditViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ClienteViewModel oCliente)
        {
            if (!ModelState.IsValid)
            {
                CargaListas();
                oCliente.EditMode = 1;
                return View(oCliente);
            }

            string id = HttpContext.Session.GetString("IdCliente") ?? "0";

            ClienteType nuevoCliente = new ClienteType
            {
                ClientId = Convert.ToInt16(id),
                ClientApellido = oCliente.ClientApellido,
                ClientDireccion = oCliente.ClientDireccion,
                ClientEmail = oCliente.ClientEmail,
                ClientEstadoCivilId = oCliente.ClientEstadoCivilId,
                ClientFechaNacimiento = oCliente.ClientFechaNacimiento ?? DateTime.Now,
                ClientGeneroId = oCliente.ClientGeneroId,
                ClientNacionalidad = oCliente.ClientNacionalidad,
                ClientNombre = oCliente.ClientNombre,
                ClientNumCta = oCliente.ClientNumCta,
                ClientNumIdentificacion = oCliente.ClientNumIdentificacion,
                ClientProfesion = oCliente.ClientProfesion,
                ClientSaldo = oCliente.ClientSaldo,
                ClientTelefono = oCliente.ClientTelefono,
                ClientTipoId = oCliente.ClientTipoId,
                UsuarioCreacion = "Angel Valdiviezo",
                FechaCreacion = DateTime.Now,
                UsuarioModificacion = "Angel Valdiviezo",
                FechaModificacion = DateTime.Now
            };

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            Cliente_Service OClientService = new Cliente_Service(_httpClient);

            var response = await OClientService.UpdateCliente(nuevoCliente, Token);

            if (response.IsSuccessStatusCode)
            {
                MensajeNotificaciones(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.success.ToString(),
                    Titulo = "EDICIÓN DE CLIENTE",
                    Mensaje = $"Edición de CLIENTE con éxito."
                });
            }
            else
            {
                MensajeNotificaciones(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.error.ToString(),
                    Titulo = "EDICIÓN DE CLIENTE",
                    Mensaje = $"Error al editar el cliente"
                });
            }

            return RedirectToAction(nameof(Index), RemoveController(nameof(HomeController)));
        }

        public async Task<IActionResult> VerDetalle()
        {
            string id = HttpContext.Session.GetString("IdClienteDet") ?? "";

            if (id == null)
            {
                return NotFound();
            }
            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            Cliente_Service OClientService = new Cliente_Service(_httpClient);
            var response = await OClientService.GetClienteById(Token, id);
            ClienteType ObjClient = new ClienteType();

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                ObjClient = JsonConvert.DeserializeObject<ResponseType<ClienteType>>(responseData).Data;
            }

            ClienteViewModel ObjClienteEditViewModel = new ClienteViewModel
            {
                ClientApellido = ObjClient.ClientApellido,
                ClientDireccion = ObjClient.ClientDireccion,
                ClientEmail = ObjClient.ClientEmail,
                ClientEstadoCivilId = ObjClient.ClientEstadoCivilId,
                ClientFechaNacimiento = ObjClient.ClientFechaNacimiento,
                ClientGeneroId = ObjClient.ClientGeneroId,
                ClientId = ObjClient.ClientId,
                ClientNacionalidad = ObjClient.ClientNacionalidad,
                ClientNombre = ObjClient.ClientNombre,
                ClientNumCta = ObjClient.ClientNumCta,
                ClientNumIdentificacion = ObjClient.ClientNumIdentificacion,
                ClientProfesion = ObjClient.ClientProfesion,
                ClientSaldo = ObjClient.ClientSaldo,
                ClientTelefono = ObjClient.ClientTelefono,
                ClientTipoId = ObjClient.ClientTipoId,
                FechaCreacion = ObjClient.FechaCreacion,
                UsuarioCreacion = ObjClient.UsuarioCreacion,
            };

            ObjClienteEditViewModel.EditMode = 1;
            CargaListas();
            return View(ObjClienteEditViewModel);
        }

        [HttpPost]
        public async Task<JsonResult> Inactivar(int id)
        {
            if (id == 0)
                return Json(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.success.ToString(),
                    Titulo = "ELIMINACIÓN DE CLIENTE",
                    Mensaje = $"No se ha elegido un cliente."
                });

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            Cliente_Service OClientService = new Cliente_Service(_httpClient);

            var response = await OClientService.DeleteCliente(id, Token);

            if (response.IsSuccessStatusCode)
            {
                return Json(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.success.ToString(),
                    Titulo = "ELIMINACIÓN DE CLIENTE",
                    Mensaje = $"Cliente fue eliminado con éxito."
                });
            }
            else
            {
                return Json(new ConfiguracionMensaje
                {
                    TipoMensaje = TipoMensaje.error.ToString(),
                    Titulo = "ELIMINACIÓN DE CLIENTE",
                    Mensaje = $"Error al eliminar el cliente"
                });
            }


        }

        #region Funciones
        private void CargaListas()
        {
            var Generos = CargaLstGenero();
            var TiposClientes = CargaLstTipoCliente();
            var EstadosCivil = CargaLstEstadoCivil();

            ViewData["ListaGeneros"] = new SelectList(Generos.Result, "GenId", "GesDescripcion", 1);
            ViewData["ListaTiposClientes"] = new SelectList(TiposClientes.Result, "TpClId", "TpClDescripcion", 1);
            ViewData["ListaEstadoCivil"] = new SelectList(EstadosCivil.Result, "EstCivId", "EstCivDescripcion", 1);

        }

        private async Task<List<GeneroType>> CargaLstGenero()
        {
            Cliente_Service OClientService = new Cliente_Service(_httpClient);

            List<GeneroType> LstGeneros = new List<GeneroType>();

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            var response = await OClientService.GetListaGeneros(Token);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                LstGeneros = JsonConvert.DeserializeObject<ResponseType<List<GeneroType>>>(responseData).Data;

            }

            return LstGeneros;
        }

        private async Task<List<TipoClienteType>> CargaLstTipoCliente()
        {
            Cliente_Service OClientService = new Cliente_Service(_httpClient);

            List<TipoClienteType> LstGeneros = new List<TipoClienteType>();

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            var response = await OClientService.GetListaTipoCliente(Token);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                LstGeneros = JsonConvert.DeserializeObject<ResponseType<List<TipoClienteType>>>(responseData).Data;

            }

            return LstGeneros;
        }

        private async Task<List<EstadoCivilType>> CargaLstEstadoCivil()
        {
            Cliente_Service OClientService = new Cliente_Service(_httpClient);

            List<EstadoCivilType> LstGeneros = new List<EstadoCivilType>();

            string Token = HttpContext.Session.GetString("JwtSesion") ?? string.Empty;

            var response = await OClientService.GetListaEstadoCivil(Token);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();

                LstGeneros = JsonConvert.DeserializeObject<ResponseType<List<EstadoCivilType>>>(responseData).Data;

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
