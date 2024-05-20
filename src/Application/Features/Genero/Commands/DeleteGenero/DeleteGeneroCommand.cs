using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Genero.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Genero;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Genero.Commands.DeleteGenero
{    
    public record DeleteGeneroCommand(int idAcontecimiento, int idEvento, string NombreEvento, DateTime Fecha, string Lugar, int NumeroEntrada, string Descripcion, int Precio) : IRequest<ResponseType<string>>;
    public class DeleteGeneroCommandQuery : IRequestHandler<DeleteGeneroCommand, ResponseType<string>>
    {
        private readonly IGenero _repository;

        public DeleteGeneroCommandQuery(
           IGenero repository)
        {
            _repository = repository;
        }

        public async Task<ResponseType<string>> Handle(DeleteGeneroCommand request, CancellationToken cancellationToken)
        {
            try
            {
                GeneroModels acontecimientos = new GeneroModels()
                {
                    
                };

                var objData1 = await _repository.DeleteGenero(acontecimientos, cancellationToken);

                return new ResponseType<string>() { Succeeded = true, Data = null, Message = CodeMessageResponse.GetMessageByCode("200", "El registro ha sido "), StatusCode = "200" };
            }
            catch (Exception)
            {
                return new ResponseType<string>() { Succeeded = false, Data = null, Message = CodeMessageResponse.GetMessageByCode("201"), StatusCode = "201" };
            }
        }
    }
}
