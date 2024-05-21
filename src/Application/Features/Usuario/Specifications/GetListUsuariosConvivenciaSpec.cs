using AngelValdiviezoWebApi.Domain.Entities.Usuario;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Specifications
{
    public class GetListUsuariosConvivenciaSpec : Specification<UsuarioModels>
    {
        public GetListUsuariosConvivenciaSpec()
        {
            Query.OrderBy(x => x.UsuarioId);
        }
    }
}
