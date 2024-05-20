using AngelValdiviezoWebApi.Domain.Entities.Usuario;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Specifications
{
    public class UsuariosByIdSpec : Specification<UsuarioModels>
    {
        public UsuariosByIdSpec(int id)
        {
            Query.Where(x => x.UsuarioId == id)
                .Include(x => x.UsuarioId);
        }
    }
}
