
using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Genero.Dto;
using AngelValdiviezoWebApi.Application.Features.Genero.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Genero;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Genero.Query
{

    public record GetListaGeneroQuery() : IRequest<ResponseType<List<GeneroType>>>;

    public class GetListaGeneroQueryHandler : IRequestHandler<GetListaGeneroQuery, ResponseType<List<GeneroType>>>
    {
        private readonly IRepositoryAsync<GeneroModels> _repositoryEventosAsync;

        public GetListaGeneroQueryHandler(IRepositoryAsync<GeneroModels> repositoryEvAsync)
        {
            _repositoryEventosAsync = repositoryEvAsync;
        }

        public async Task<ResponseType<List<GeneroType>>> Handle(GetListaGeneroQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _repositoryEventosAsync.ListAsync(new GetListGeneroConvivenciaSpec(), cancellationToken);

                if (!data.Any())
                    return new ResponseType<List<GeneroType>>() { Data = null, Message = "No existen registros agregados", StatusCode = "001", Succeeded = false };


                var response = ProcesoListadoGenero(data);

                return new ResponseType<List<GeneroType>>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<List<GeneroType>>() { Data = null, Message = CodeMessageResponse.GetMessageByCode("500"), StatusCode = "500", Succeeded = false };
            }
        }

        public static List<GeneroType> ProcesoListadoGenero(List<GeneroModels> lstTpCl)
        {
            var res = new List<GeneroType>();

            foreach (var objTpCl in lstTpCl)
            {
                res.Add(new()
                {
                    GenId = objTpCl.GenId,
                    FechaCreacion = objTpCl.FechaCreacion,
                    GenActivo = objTpCl.GenActivo,
                    GesDescripcion = objTpCl.GesDescripcion,
                    UsuarioCreacion = objTpCl.UsuarioCreacion,                    
                }
                 );
            }


            res = res.OrderBy(x => x.GenId).ToList();

            return res;
        }

    }

}
