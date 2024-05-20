
using AngelValdiviezoWebApi.Application.Common.Wrappers;

using AngelValdiviezoWebApi.Application.Features.Genero.Commands.CreateGenero;
using AngelValdiviezoWebApi.Domain.Entities.Genero;

namespace AngelValdiviezoWebApi.Application.Features.Genero.Interfaces
{
    public interface IGenero
    {
        Task<ResponseType<string>> CreateGenero(CreateGeneroRequest Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> UpdateGenero(GeneroModels Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> DeleteGenero(GeneroModels Request, CancellationToken cancellationToken);
    }
}
