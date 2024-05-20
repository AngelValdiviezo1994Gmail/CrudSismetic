using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Usuario;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Commands.UpdateUsuario
{
    public record UpdateUsuarioCommand(
        int idUsuario, int idCargo, int idPerfil, string apellidoUsuario,
        string direccionUsuario, int edadUsuario, bool estadoUsuario,
        DateTime fechaNacimientoUsuario, string nombreUsuario,
        string usuarioCreacion, DateTime fechaCreacion, 
        string usuarioModificacion, DateTime fechaModificacion) : IRequest<ResponseType<string>>;
    public class UpdateUsuarioCommandQuery : IRequestHandler<UpdateUsuarioCommand, ResponseType<string>>
    {

        private readonly IUsuario _repositoryUsuario;

        public UpdateUsuarioCommandQuery(
           IUsuario Usuarios)
        {
            _repositoryUsuario = Usuarios;
        }

        public async Task<ResponseType<string>> Handle(UpdateUsuarioCommand request, CancellationToken cancellationToken)
        {
            try
            {
                UsuarioModels Usuarios = new UsuarioModels()
                {
                    UsuarioId = request.idUsuario,
                    CargoId = request.idCargo,
                    PerfilId = request.idPerfil,
                    UsuarioApellido = request.apellidoUsuario,
                    UsuarioDireccion = request.direccionUsuario,
                    UsuarioEdad = request.edadUsuario,
                    UsuarioEstado = request.estadoUsuario,
                    UsuarioFechaNacimiento = request.fechaNacimientoUsuario,
                    UsuarioNombre = request.nombreUsuario,
                    UsuarioModificacion = request.usuarioModificacion,                    
                    FechaCreacion = request.fechaCreacion,
                    FechaModificacion = request.fechaModificacion,
                    UsuarioCreacion = request.usuarioCreacion
                };

                var objData1 = await _repositoryUsuario.UpdateUsuario(Usuarios, cancellationToken);

                return new ResponseType<string>() { Succeeded = true, Data = null, Message = CodeMessageResponse.GetMessageByCode("200", "El registro ha sido "), StatusCode = "200" };
            }
            catch (Exception)
            {
                return new ResponseType<string>() { Succeeded = false, Data = null, Message = CodeMessageResponse.GetMessageByCode("201"), StatusCode = "201" };
            }
        }
    }

}
