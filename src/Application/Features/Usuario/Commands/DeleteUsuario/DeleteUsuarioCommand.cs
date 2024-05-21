using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Usuario;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Commands.DeleteUsuario
{

    public record DeleteUsuarioCommand(int IdUsuario) : IRequest<ResponseType<string>>;

    public class DeleteUsuarioCommandQuery : IRequestHandler<DeleteUsuarioCommand, ResponseType<string>>
    {

        private readonly IUsuario _repositoryAcontecimiento;

        public DeleteUsuarioCommandQuery(
           IUsuario acontecimientos)
        {
            _repositoryAcontecimiento = acontecimientos;
        }

        public async Task<ResponseType<string>> Handle(DeleteUsuarioCommand request, CancellationToken cancellationToken)
        {
            try
            {
                UsuarioModels acontecimientos = new UsuarioModels()
                {
                    UsuarioId = request.IdUsuario
                };

                var objData1 = await _repositoryAcontecimiento.DeleteUsuario(acontecimientos, cancellationToken);



                return new ResponseType<string>() { Succeeded = true, Data = null, Message = CodeMessageResponse.GetMessageByCode("300", "El registro ha sido "), StatusCode = "200" };
            }
            catch (Exception)
            {
                return new ResponseType<string>() { Succeeded = false, Data = null, Message = CodeMessageResponse.GetMessageByCode("301"), StatusCode = "301" };
            }
        }
    }
}
