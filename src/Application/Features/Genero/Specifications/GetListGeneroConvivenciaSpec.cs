using AngelValdiviezoWebApi.Domain.Entities.Genero;
using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AngelValdiviezoWebApi.Application.Features.Genero.Specifications
{
    public class GetListGeneroConvivenciaSpec : Specification<GeneroModels>
    {
        public GetListGeneroConvivenciaSpec()
        {
            Query.OrderBy(x => x.GenId);
        }
    }
}
