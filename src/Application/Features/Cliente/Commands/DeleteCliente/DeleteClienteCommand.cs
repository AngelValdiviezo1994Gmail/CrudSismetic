using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Commands.DeleteCliente
{
    public record DeleteClienteCommand(int IdCliente) : IRequest<ResponseType<string>>;
    
    public class DeleteClienteCommandQuery : IRequestHandler<DeleteClienteCommand, ResponseType<string>>
    {

        private readonly IClientes _repositoryAcontecimiento;

        public DeleteClienteCommandQuery(
           IClientes acontecimientos)
        {
            _repositoryAcontecimiento = acontecimientos;
        }

        public async Task<ResponseType<string>> Handle(DeleteClienteCommand request, CancellationToken cancellationToken)
        {
            try
            {
                ClienteModels acontecimientos = new ClienteModels()
                {
                    ClientId = request.IdCliente
                };

                var objData1 = await _repositoryAcontecimiento.DeleteCliente(acontecimientos, cancellationToken);



                return new ResponseType<string>() { Succeeded = true, Data = null, Message = CodeMessageResponse.GetMessageByCode("300", "El registro ha sido "), StatusCode = "200" };
            }
            catch (Exception)
            {
                return new ResponseType<string>() { Succeeded = false, Data = null, Message = CodeMessageResponse.GetMessageByCode("301"), StatusCode = "301" };
            }
        }
    }
}
