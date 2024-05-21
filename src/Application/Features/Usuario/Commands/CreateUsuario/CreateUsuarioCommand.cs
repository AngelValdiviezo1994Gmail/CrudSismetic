using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.Commands.CreateUsuario;
using AngelValdiviezoWebApi.Application.Features.Usuario.Interfaces;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Commands.CreateUsuario
{

    public record CreateUsuarioCommand(CreateUsuariosRequest CreateUsuario) : IRequest<ResponseType<string>>;

    public class CreateUsuarioCommandHandler : IRequestHandler<CreateUsuarioCommand, ResponseType<string>>
    {

        private readonly IUsuario _repository;

        public CreateUsuarioCommandHandler(IUsuario repository)
        {
            _repository = repository;
        }

        public async Task<ResponseType<string>> Handle(CreateUsuarioCommand request, CancellationToken cancellationToken)
        {
            var objResult = await _repository.CreateUsuario(request.CreateUsuario, cancellationToken);
            return objResult;
        }
    }

}
