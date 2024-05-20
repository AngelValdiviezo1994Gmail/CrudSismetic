using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Genero.Interfaces;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Genero.Commands.CreateGenero
{
    public record CreateGeneroCommand(CreateGeneroRequest CreateMarcacion) : IRequest<ResponseType<string>>;

    public class CreateGeneroCommandHandler : IRequestHandler<CreateGeneroCommand, ResponseType<string>>
    {

        private readonly IGenero _repository;

        public CreateGeneroCommandHandler(IGenero repository)
        {
            _repository = repository;
        }

        public async Task<ResponseType<string>> Handle(CreateGeneroCommand request, CancellationToken cancellationToken)
        {
            var objResult = await _repository.CreateGenero(request.CreateMarcacion, cancellationToken);
            return objResult;
        }
    }

}
