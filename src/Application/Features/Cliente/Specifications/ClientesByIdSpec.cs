using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Specifications
{
    public class ClientesByIdSpec : Specification<ClienteModels>
    {
        public ClientesByIdSpec(int id)
        {
            Query.Where(x => x.ClientId == id)
                .Include(x => x.ClientId);
        }
    }
}
