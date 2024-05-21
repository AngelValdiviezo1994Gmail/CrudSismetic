using AngelValdiviezoWebApi.Domain.Entities.Catalogo.Cargo;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Cargo.Specifications
{
    public class GetListCargosConvivenciaSpec : Specification<CargoModels>
    {
        public GetListCargosConvivenciaSpec()
        {
            Query.OrderBy(x => x.CargoId);
        }
    }
}
