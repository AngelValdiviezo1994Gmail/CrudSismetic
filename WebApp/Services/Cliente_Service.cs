using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Domain.Constant;
using Newtonsoft.Json;
using System;
using System.Net.Http.Headers;
using System.Text;
using WebApp.Models.Registros;
using WebAppCrudAngelValdiviezo.ViewModel.Auth;

namespace WebApp.Services
{
    public class Cliente_Service
    {
        private readonly HttpClient _httpClient;
        private readonly Conexion _Conexion;

        public Cliente_Service(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _Conexion = new Conexion();
        }

        public async Task<HttpResponseMessage> GetClientes(string token)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiCliente, "GetClientes");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> GetClienteById(string token, string id)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiCliente, id);

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }


        public async Task<HttpResponseMessage> GetListaGeneros(string token)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiGenero, "GetGenero");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> GetListaTipoCliente(string token)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiTipoCliente, "GetTipoCliente");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> GetListaEstadoCivil(string token)
        {
            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiEstCivil, "GetEstadoCivil");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(Ruta);

                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> CreateCliente(ClienteType OCltType, string token)
        {
            ClienteRegistro ObjClienteRegistro = new ClienteRegistro 
            { 
                apellidoCliente = OCltType.ClientApellido,
                direccionCliente = OCltType.ClientDireccion,
                emailCliente = OCltType.ClientEmail,
                fechaCreacion = OCltType.FechaCreacion,
                fechaModificacion = OCltType.FechaModificacion,
                fechaNacimientoCliente = OCltType.ClientFechaNacimiento,
                idCliente = OCltType.ClientId,
                idEstadoCivilCliente = OCltType.ClientEstadoCivilId,
                idGeneroCliente = OCltType.ClientGeneroId,
                idTipoCliente = OCltType.ClientTipoId,
                nacionalidadCliente = OCltType.ClientNacionalidad,
                nombreCliente = OCltType.ClientNombre,
                numCtaCliente = OCltType.ClientNumCta,
                numIdentificacionCliente = OCltType.ClientNumIdentificacion,
                profesionCliente = OCltType.ClientProfesion,
                saldoCliente = OCltType.ClientSaldo,
                telefonoCliente = OCltType.ClientTelefono,
                usuarioCreacion = OCltType.UsuarioCreacion,
                usuarioModificacion = OCltType.UsuarioModificacion
            };
            
            var json = JsonConvert.SerializeObject(ObjClienteRegistro);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiCliente, "CreateCliente");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.PostAsync(Ruta, content);
                
                return response;
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage();
            }
        }

        public async Task<HttpResponseMessage> UpdateCliente(ClienteType OCltType, string token)
        {
            ClienteRegistro ObjClienteEdicion = new ClienteRegistro
            {
                apellidoCliente = OCltType.ClientApellido,
                direccionCliente = OCltType.ClientDireccion,
                emailCliente = OCltType.ClientEmail,
                fechaCreacion = OCltType.FechaCreacion,
                fechaModificacion = OCltType.FechaModificacion,
                fechaNacimientoCliente = OCltType.ClientFechaNacimiento,
                idCliente = OCltType.ClientId,
                idEstadoCivilCliente = OCltType.ClientEstadoCivilId,
                idGeneroCliente = OCltType.ClientGeneroId,
                idTipoCliente = OCltType.ClientTipoId,
                nacionalidadCliente = OCltType.ClientNacionalidad,
                nombreCliente = OCltType.ClientNombre,
                numCtaCliente = OCltType.ClientNumCta,
                numIdentificacionCliente = OCltType.ClientNumIdentificacion,
                profesionCliente = OCltType.ClientProfesion,
                saldoCliente = OCltType.ClientSaldo,
                telefonoCliente = OCltType.ClientTelefono,
                usuarioCreacion = OCltType.UsuarioCreacion,
                usuarioModificacion = OCltType.UsuarioModificacion
            };

            try
            {
                string Complemento = string.Concat("UpdateCliente?idCliente=", ObjClienteEdicion.idCliente,
                    "&nombreCliente=", ObjClienteEdicion.nombreCliente, "&apellidoCliente=", ObjClienteEdicion.apellidoCliente,
                    "&numCtaCliente=", ObjClienteEdicion.numCtaCliente, "&saldoCliente=", ObjClienteEdicion.saldoCliente,
                    "&fechaNacimientoCliente=", ObjClienteEdicion.fechaNacimientoCliente.ToString("yyyy/MM/dd"), "&direccionCliente=", ObjClienteEdicion.direccionCliente,
                    "&telefonoCliente=", ObjClienteEdicion.telefonoCliente, "&emailCliente=", ObjClienteEdicion.emailCliente,
                    "&idTipoCliente=", ObjClienteEdicion.idTipoCliente, "&idEstadoCivilCliente=", ObjClienteEdicion.idEstadoCivilCliente,
                    "&numIdentificacionCliente=", ObjClienteEdicion.numIdentificacionCliente, "&profesionCliente=", ObjClienteEdicion.profesionCliente,
                    "&idGeneroCliente=", ObjClienteEdicion.idGeneroCliente, "&nacionalidadCliente=", ObjClienteEdicion.nacionalidadCliente,
                    "&usuarioCreacion=", ObjClienteEdicion.usuarioCreacion, "&fechaCreacion=", ObjClienteEdicion.fechaCreacion?.ToString("yyyy/MM/dd"),
                    "&usuarioModificacion=", ObjClienteEdicion.usuarioModificacion, "&fechaModificacion=", ObjClienteEdicion.fechaModificacion?.ToString("yyyy/MM/dd"));

                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiCliente, Complemento);
                /*

                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var request = new HttpRequestMessage(HttpMethod.Put, Ruta);

                var response = await _httpClient.SendAsync(request);
                */

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

        public async Task<HttpResponseMessage> DeleteCliente(int id, string token)
        {
            //var content = new StringContent(string.Empty, Encoding.UTF8, "application/json");

            try
            {
                string Ruta = string.Concat(_Conexion.Puerto, _Conexion.ApiCliente, "EliminaCliente?IdCliente="+ id);

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
