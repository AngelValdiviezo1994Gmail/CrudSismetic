using AngelValdiviezoWebApi.Domain.Entities.Catalogo.TipoCliente;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Specifications
{
    public class TipoClienteByIdSpec : Specification<TipoClienteModels>
    {
        public TipoClienteByIdSpec(int id)
        {
            Query.Where(x => x.TpClId == id)
                .Include(x => x.TpClId);
        }
    }
}
