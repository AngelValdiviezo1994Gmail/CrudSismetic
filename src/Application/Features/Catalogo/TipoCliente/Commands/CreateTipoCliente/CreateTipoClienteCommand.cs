using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Interfaces;
using AutoMapper;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Commands.CreateTipoCliente
{
    public record CreateTipoClienteCommand(CreateTipoClienteRequest CreateMarcacion) : IRequest<ResponseType<string>>;

    public class CreateTipoClienteCommandHandler : IRequestHandler<CreateTipoClienteCommand, ResponseType<string>>
    {

        private readonly ITipoCliente _repository;

        public CreateTipoClienteCommandHandler(ITipoCliente repository)
        {
            _repository = repository;
        }

        public async Task<ResponseType<string>> Handle(CreateTipoClienteCommand request, CancellationToken cancellationToken)
        {
            var objResult = await _repository.CreateTipoCliente(request.CreateMarcacion, cancellationToken);
            return objResult;

        }
    }

}
