using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Catalogo.EstadoCivil.Dto;
using AngelValdiviezoWebApi.Application.Features.Catalogo.EstadoCivil.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.EstadoCivil;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.EstadoCivil.Query
{

    public record GetListaEstadoCivilQuery() : IRequest<ResponseType<List<EstadoCivilType>>>;

    public class GetListaEstadoCivilQueryHandler : IRequestHandler<GetListaEstadoCivilQuery, ResponseType<List<EstadoCivilType>>>
    {
        private readonly IRepositoryAsync<EstadoCivilModels> _repositoryEventosAsync;

        public GetListaEstadoCivilQueryHandler(IRepositoryAsync<EstadoCivilModels> repositoryEvAsync)
        {
            _repositoryEventosAsync = repositoryEvAsync;
        }

        public async Task<ResponseType<List<EstadoCivilType>>> Handle(GetListaEstadoCivilQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _repositoryEventosAsync.ListAsync(new GetListEstadoCivilConvivenciaSpec(), cancellationToken);

                if (!data.Any())
                    return new ResponseType<List<EstadoCivilType>>() { Data = null, Message = "No existen registros agregados", StatusCode = "001", Succeeded = false };


                var response = ProcesoListadoEstadoCivil(data);

                return new ResponseType<List<EstadoCivilType>>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<List<EstadoCivilType>>() { Data = null, Message = CodeMessageResponse.GetMessageByCode("500"), StatusCode = "500", Succeeded = false };
            }
        }

        public static List<EstadoCivilType> ProcesoListadoEstadoCivil(List<EstadoCivilModels> lstEstCiv)
        {
            var res = new List<EstadoCivilType>();

            foreach (var objEstCiv in lstEstCiv)
            {
                res.Add(new()
                {
                    EstCivId = objEstCiv.EstCivId,
                    FechaCreacion = objEstCiv.FechaCreacion,
                    EstCivActivo = objEstCiv.EstCivActivo,
                    EstCivDescripcion = objEstCiv.EstCivDescripcion,
                    UsuarioCreacion = objEstCiv.UsuarioCreacion
                }
                 );
            }


            res = res.OrderBy(x => x.EstCivId).ToList();

            return res;
        }

    }

}
