using AngelValdiviezoWebApi.Application.Common.Wrappers;

using AngelValdiviezoWebApi.Application.Features.Acontecimientos.Dto;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Commands.CreateTipoCliente;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.TipoCliente;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Interfaces
{
    public interface ITipoCliente
    {
        Task<ResponseType<string>> CreateTipoCliente(CreateTipoClienteRequest Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> UpdateTipoCliente(TipoClienteModels Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> DeleteTipoCliente(TipoClienteModels Request, CancellationToken cancellationToken);
    }
}
