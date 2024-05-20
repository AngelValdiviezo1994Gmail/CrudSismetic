using AngelValdiviezoWebApi.Application.Common.Wrappers;

using AngelValdiviezoWebApi.Application.Features.Cliente.Commands.CreateCliente;

using AngelValdiviezoWebApi.Domain.Entities.Cliente;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces
{
    public interface IClientes
    {
        Task<ResponseType<string>> CreateCliente(CreateClientesRequest Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> UpdateCliente(ClienteModels Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> DeleteCliente(ClienteModels Request, CancellationToken cancellationToken);
    }
}
