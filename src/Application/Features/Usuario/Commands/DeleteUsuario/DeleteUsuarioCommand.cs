using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Commands.DeleteUsuario
{

    public record DeleteUsuarioCommand(int IdCliente) : IRequest<ResponseType<string>>;

    public class DeleteUsuarioCommandQuery : IRequestHandler<DeleteUsuarioCommand, ResponseType<string>>
    {

        private readonly IClientes _repositoryAcontecimiento;

        public DeleteUsuarioCommandQuery(
           IClientes acontecimientos)
        {
            _repositoryAcontecimiento = acontecimientos;
        }

        public async Task<ResponseType<string>> Handle(DeleteUsuarioCommand request, CancellationToken cancellationToken)
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
