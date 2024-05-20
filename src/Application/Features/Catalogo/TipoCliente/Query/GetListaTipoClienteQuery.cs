
using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Dto;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.TipoCliente;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Query
{

    public record GetListaTipoClienteQuery() : IRequest<ResponseType<List<TipoClienteType>>>;

    public class GetListaTipoClienteQueryHandler : IRequestHandler<GetListaTipoClienteQuery, ResponseType<List<TipoClienteType>>>
    {
        private readonly IRepositoryAsync<TipoClienteModels> _repositoryEventosAsync;

        public GetListaTipoClienteQueryHandler(IRepositoryAsync<TipoClienteModels> repositoryEvAsync)
        {
            _repositoryEventosAsync = repositoryEvAsync;
        }

        public async Task<ResponseType<List<TipoClienteType>>> Handle(GetListaTipoClienteQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _repositoryEventosAsync.ListAsync(new GetListTipoClienteConvivenciaSpec(), cancellationToken);

                if (!data.Any())
                    return new ResponseType<List<TipoClienteType>>() { Data = null, Message = "No existen registros agregados", StatusCode = "001", Succeeded = false };


                var response = ProcesoListadoTipoCliente(data);

                return new ResponseType<List<TipoClienteType>>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<List<TipoClienteType>>() { Data = null, Message = CodeMessageResponse.GetMessageByCode("500"), StatusCode = "500", Succeeded = false };
            }
        }

        public static List<TipoClienteType> ProcesoListadoTipoCliente(List<TipoClienteModels> lstTpCl)
        {
            var res = new List<TipoClienteType>();

            foreach (var objTpCl in lstTpCl)
            {
                res.Add(new()
                {
                    TpClId = objTpCl.TpClId,
                    FechaCreacion = objTpCl.FechaCreacion,
                    TpClActivo = objTpCl.TpClActivo,
                    TpClDescripcion = objTpCl.TpClDescripcion,
                    UsuarioCreacion = objTpCl.UsuarioCreacion
                }
                 );
            }


            res = res.OrderBy(x => x.TpClId).ToList();

            return res;
        }

    }

}
