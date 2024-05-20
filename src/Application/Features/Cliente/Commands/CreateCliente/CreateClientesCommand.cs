using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Commands.CreateCliente
{

    public record CreateClientesCommand(CreateClientesRequest CreateCliente) : IRequest<ResponseType<string>>;

    public class CreateClientesCommandHandler : IRequestHandler<CreateClientesCommand, ResponseType<string>>
    {

        private readonly IClientes _repository;

        public CreateClientesCommandHandler(IClientes repository)
        {
            _repository = repository;
        }

        public async Task<ResponseType<string>> Handle(CreateClientesCommand request, CancellationToken cancellationToken)
        {
            var objResult = await _repository.CreateCliente(request.CreateCliente, cancellationToken);
            return objResult;

        }
    }

}
