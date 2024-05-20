using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.Commands.CreateUsuario;
using AngelValdiviezoWebApi.Domain.Entities.Usuario;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Interfaces
{
    public interface IUsuario
    {
        Task<ResponseType<string>> CreateUsuario(CreateUsuariosRequest Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> UpdateUsuario(UsuarioModels Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> DeleteUsuario(UsuarioModels Request, CancellationToken cancellationToken);
    }
}
