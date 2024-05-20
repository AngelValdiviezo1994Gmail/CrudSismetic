using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using Ardalis.Specification;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Specifications
{
    public class ClienteByIdSpec : Specification<ClienteModels>
    {
        public ClienteByIdSpec(int id)
        {
            Query.Where(p => p.ClientId == id);
        }
    }
}
