using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.Commands.CreateUsuario;
using AngelValdiviezoWebApi.Application.Features.Usuario.DTO;
using AngelValdiviezoWebApi.Application.Features.Usuario.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Usuario;

namespace AngelValdiviezoWebApi.Persistence.Repository.Usuario
{
    public class UsuarioService : IUsuario
    {
        private readonly IRepositoryAsync<UsuarioModels> _repositoryAcontecimientoAsync;

        public UsuarioService(IRepositoryAsync<UsuarioModels> repositoryAcontecimientoAsync)
        {
            _repositoryAcontecimientoAsync = repositoryAcontecimientoAsync;
        }

        public async Task<ResponseType<string>> CreateUsuario(CreateUsuariosRequest Request, CancellationToken cancellationToken)
        {
            try
            {
                var marcacionColaborador = DateTime.Now;
                UsuarioResponseType objResultFinal = new();

                UsuarioModels objAcont = new()
                {
                    CargoId = Request.CargoId,
                    PerfilId = Request.PerfilId,
                    UsuarioApellido = Request.UsuarioApellido,
                    UsuarioDireccion = Request.UsuarioDireccion,
                    UsuarioEdad = Request.UsuarioEdad,
                    UsuarioEstado = Request.UsuarioEstado,
                    UsuarioFechaNacimiento = Request.UsuarioFechaNacimiento,
                    UsuarioId = Request.UsuarioId,
                    UsuarioNombre = Request.UsuarioNombre,
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


        public async Task<ResponseType<string>> UpdateUsuario(UsuarioModels Request, CancellationToken cancellationToken)
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

        public async Task<ResponseType<string>> DeleteUsuario(UsuarioModels Request, CancellationToken cancellationToken)
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
