using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Specifications
{
    public class GetListClientesConvivenciaSpec : Specification<ClienteModels>
    {
        public GetListClientesConvivenciaSpec()
        {
            Query.OrderBy(x => x.ClientId);
        }
    }
}
