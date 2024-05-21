using AngelValdiviezoWebApi.Domain.Entities.Genero;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Genero.Specifications
{
    public class GetListGeneroConvivenciaSpec : Specification<GeneroModels>
    {
        public GetListGeneroConvivenciaSpec()
        {
            Query.OrderBy(x => x.GenId);
        }
    }
}
