using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Commands.CreateCliente;
using AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Commands.CreateUsuario
{

    public record CreateUsuarioCommand(CreateClientesRequest CreateCliente) : IRequest<ResponseType<string>>;

    public class CreateUsuarioCommandHandler : IRequestHandler<CreateUsuarioCommand, ResponseType<string>>
    {

        private readonly IClientes _repository;

        public CreateUsuarioCommandHandler(IClientes repository)
        {
            _repository = repository;
        }

        public async Task<ResponseType<string>> Handle(CreateUsuarioCommand request, CancellationToken cancellationToken)
        {
            var objResult = await _repository.CreateCliente(request.CreateCliente, cancellationToken);
            return objResult;
        }
    }

}
