using AngelValdiviezoWebApi.Domain.Entities.Perfil;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Perfil.Specifications
{
    public class GetListPerfilesConvivenciaSpec : Specification<PerfilModels>
    {
        public GetListPerfilesConvivenciaSpec()
        {
            Query.OrderBy(x => x.PerfilId);
        }
    }
}
