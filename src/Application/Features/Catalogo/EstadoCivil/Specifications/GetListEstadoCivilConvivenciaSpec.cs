using AngelValdiviezoWebApi.Domain.Entities.Catalogo.EstadoCivil;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.EstadoCivil.Specifications
{
    public class GetListEstadoCivilConvivenciaSpec : Specification<EstadoCivilModels>
    {
        public GetListEstadoCivilConvivenciaSpec()
        {
            Query.OrderBy(x => x.EstCivId);
        }
    }
}
