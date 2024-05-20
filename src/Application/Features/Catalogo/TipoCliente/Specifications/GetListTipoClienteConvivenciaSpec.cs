using AngelValdiviezoWebApi.Domain.Entities.Catalogo.TipoCliente;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Specifications
{
    public class GetListTipoClienteConvivenciaSpec : Specification<TipoClienteModels>
    {
        public GetListTipoClienteConvivenciaSpec()
        {
            Query.OrderBy(x => x.TpClId);
        }
    }
}
