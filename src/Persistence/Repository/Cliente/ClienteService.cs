using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Commands.CreateCliente;
using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;

namespace AngelValdiviezoWebApi.Persistence.Repository.Cliente
{
    public class ClienteService : IClientes
    {
        private readonly IRepositoryAsync<ClienteModels> _repositoryAcontecimientoAsync;

        public ClienteService(IRepositoryAsync<ClienteModels> repositoryAcontecimientoAsync)
        {
            _repositoryAcontecimientoAsync = repositoryAcontecimientoAsync;
        }

        public async Task<ResponseType<string>> CreateCliente(CreateClientesRequest Request, CancellationToken cancellationToken)
        {
            try
            {
                var marcacionColaborador = DateTime.Now;
                ClienteResponseType objResultFinal = new();

                ClienteModels objAcont = new()
                {
                    ClientId = Request.ClientId,
                    ClientApellido = Request.ClientApellido,
                    ClientDireccion = Request.ClientDireccion,
                    ClientEmail = Request.ClientEmail,
                    ClientEstadoCivilId = Request.ClientEstadoCivilId,
                    ClientFechaNacimiento = Request.ClientFechaNacimiento,
                    ClientGeneroId = Request.ClientGeneroId,
                    ClientNacionalidad = Request.ClientNacionalidad,
                    ClientNombre = Request.ClientNombre,
                    ClientNumCta = Request.ClientNumCta,
                    ClientNumIdentificacion = Request.ClientNumIdentificacion,
                    ClientProfesion = Request.ClientProfesion,
                    ClientSaldo = Request.ClientSaldo,
                    ClientTelefono = Request.ClientTelefono,
                    ClientTipoId = Request.ClientTipoId,
                    FechaCreacion = Request.FechaCreacion,
                    FechaModificacion = Request.FechaModificacion,
                    UsuarioCreacion = Request.UsuarioCreacion,
                    UsuarioModificacion = Request.UsuarioModificacion
                };

                var objResultado = await _repositoryAcontecimientoAsync.AddAsync(objAcont, cancellationToken);
                if (objResultado is null)
                {
                    return new ResponseType<string>() { Message = "No se ha podido registrar su información", StatusCode = "101", Succeeded = true };
                }

                return new ResponseType<string>() { Data = null, Message = "Registro ingresado correctamente", StatusCode = "100", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<string>() { Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102", Succeeded = false };
            }


        }


        public async Task<ResponseType<string>> UpdateCliente(ClienteModels Request, CancellationToken cancellationToken)
        {
            try
            {
                await _repositoryAcontecimientoAsync.UpdateAsync(Request, cancellationToken);


                return new ResponseType<string>() { Data = null, Message = "Registro ingresado correctamente", StatusCode = "100", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<string>() { Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102", Succeeded = false };
            }


        }

        public async Task<ResponseType<string>> DeleteCliente(ClienteModels Request, CancellationToken cancellationToken)
        {
            try
            {
                await _repositoryAcontecimientoAsync.DeleteAsync(Request, cancellationToken);


                return new ResponseType<string>() { Data = null, Message = "Registro ingresado correctamente", StatusCode = "100", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<string>() { Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102", Succeeded = false };
            }


        }

    }
}
