

using AngelValdiviezoWebApi.Domain.Entities.Genero;
using Ardalis.Specification;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AngelValdiviezoWebApi.Application.Features.Genero.Specifications
{
    public class GeneroByIdSpec : Specification<GeneroModels>
    {
        public GeneroByIdSpec(int id)
        {
            Query.Where(x => x.GenId == id)
                .Include(x => x.GenId);
        }
    }
}
