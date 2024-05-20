using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.TipoCliente;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Commands.UpdateTipoCliente
{
    public record UpdateTipoClienteCommand(int idAcontecimiento, int idEvento, string NombreEvento, DateTime Fecha, string Lugar, int NumeroEntrada, string Descripcion, int Precio) : IRequest<ResponseType<string>>;

    public class UpdateTipoClienteCommandQuery : IRequestHandler<UpdateTipoClienteCommand, ResponseType<string>>
    {

        private readonly ITipoCliente _repository;

        public UpdateTipoClienteCommandQuery(
           ITipoCliente acontecimientos)
        {
            _repository = acontecimientos;
        }

        public async Task<ResponseType<string>> Handle(UpdateTipoClienteCommand request, CancellationToken cancellationToken)
        {
            try
            {
                TipoClienteModels acontecimientos = new TipoClienteModels()
                {
                };

                var objData1 = await _repository.UpdateTipoCliente(acontecimientos, cancellationToken);

                return new ResponseType<string>() { Succeeded = true, Data = null, Message = CodeMessageResponse.GetMessageByCode("200", "El registro ha sido "), StatusCode = "200" };
            }
            catch (Exception)
            {
                return new ResponseType<string>() { Succeeded = false, Data = null, Message = CodeMessageResponse.GetMessageByCode("201"), StatusCode = "201" };
            }
        }
    }

}
