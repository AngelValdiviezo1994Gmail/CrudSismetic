using AngelValdiviezoWebApi.Application.Features.Usuario.DTO;
using AngelValdiviezoWebApi.Domain.Constant;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using WebApp.Models.Registros;

namespace WebApp.Services
{
    public class Usuario_Service
    {
        private readonly HttpClient _httpClient;
        private readonly Conexion _Conexion;

        public Usuario_Service(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _Conexion = new Conexion();
        }

        public async Task<HttpResponseMessage> GetUsuarios(string token)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiUsuario, "GetUsuarios");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> GetUsuarioById(string token, string id)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiUsuario, id);

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> GetListaPerfiles(string token)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiPerfil, "GetPerfiles");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> GetListaCargo(string token)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiCargo, "GetCargos");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> CreateUsuario(UsuarioType OCltType, string token)
        {
            UsuarioRegistro ObjUsuarioRegistro = new UsuarioRegistro
            {
                idUsuario = OCltType.UsuarioId,
                idCargo = OCltType.CargoId,
                idPerfil = OCltType.PerfilId,
                apellidoUsuario = OCltType.UsuarioApellido,
                direccionUsuario = OCltType.UsuarioDireccion,
                edadUsuario = OCltType.UsuarioEdad,
                estadoUsuario = OCltType.UsuarioEstado,
                fechaNacimientoUsuario = OCltType.UsuarioFechaNacimiento,
                nombreUsuario = OCltType.UsuarioNombre,
                usuarioCreacion = OCltType.UsuarioCreacion,
                fechaCreacion = OCltType.FechaCreacion,
                usuarioModificacion = OCltType.UsuarioModificacion,
                fechaModificacion = OCltType.FechaModificacion
            };

            var json = JsonConvert.SerializeObject(ObjUsuarioRegistro);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiUsuario, "CreateUsuario");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.PostAsync(Ruta, content);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> UpdateUsuario(UsuarioType OCltType, string token)
        {
            UsuarioRegistro ObjUsuarioEdicion = new UsuarioRegistro
            {
                idUsuario = OCltType.UsuarioId,
                idCargo = OCltType.CargoId,
                idPerfil = OCltType.PerfilId,
                apellidoUsuario = OCltType.UsuarioApellido,
                direccionUsuario = OCltType.UsuarioDireccion,
                edadUsuario = OCltType.UsuarioEdad,
                estadoUsuario = OCltType.UsuarioEstado,
                fechaNacimientoUsuario = OCltType.UsuarioFechaNacimiento,
                nombreUsuario = OCltType.UsuarioNombre,
                usuarioCreacion = OCltType.UsuarioCreacion,
                fechaCreacion = OCltType.FechaCreacion,
                usuarioModificacion = OCltType.UsuarioModificacion,
                fechaModificacion = OCltType.FechaModificacion
            };

            try
            {
                string Complemento = string.Concat("UpdateUsuario?idUsuario=", ObjUsuarioEdicion.idUsuario,
                    "&idCargo=", ObjUsuarioEdicion.idCargo, "&idPerfil=", ObjUsuarioEdicion.idPerfil,
                    "&apellidoUsuario=", ObjUsuarioEdicion.apellidoUsuario, "&direccionUsuario=", ObjUsuarioEdicion.direccionUsuario,
                    "&edadUsuario=", ObjUsuarioEdicion.edadUsuario, "&estadoUsuario=", ObjUsuarioEdicion.estadoUsuario,
                    "&fechaNacimientoUsuario=", ObjUsuarioEdicion.fechaNacimientoUsuario.ToString("yyyy/MM/dd"), "&nombreUsuario=", ObjUsuarioEdicion.nombreUsuario,
                    "&usuarioCreacion=", ObjUsuarioEdicion.usuarioCreacion, "&fechaCreacion=", ObjUsuarioEdicion.fechaCreacion?.ToString("yyyy/MM/dd"),
                    "&usuarioModificacion=", ObjUsuarioEdicion.usuarioModificacion, "&fechaModificacion=", ObjUsuarioEdicion.fechaModificacion?.ToString("yyyy/MM/dd"));

                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiUsuario, Complemento);
                
                var content = new StringContent("", Encoding.UTF8, "application/json");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                HttpResponseMessage response = await _httpClient.PutAsync(Ruta, content);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> DeleteUsuario(int id, string token)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiUsuario, "EliminaUsuario?IdUsuario=" + id);

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.DeleteAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

    }
}
