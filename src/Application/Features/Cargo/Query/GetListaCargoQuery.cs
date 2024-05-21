using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cargo.DTO;
using AngelValdiviezoWebApi.Application.Features.Cargo.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.Cargo;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Cargo.Query
{
    public record GetListaCargoQuery() : IRequest<ResponseType<List<CargoType>>>;

    public class GetListaCargoQueryHandler : IRequestHandler<GetListaCargoQuery, ResponseType<List<CargoType>>>
    {
        private readonly IRepositoryAsync<CargoModels> _repositoryEventosAsync;

        public GetListaCargoQueryHandler(IRepositoryAsync<CargoModels> repositoryEvAsync)
        {
            _repositoryEventosAsync = repositoryEvAsync;
        }

        public async Task<ResponseType<List<CargoType>>> Handle(GetListaCargoQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _repositoryEventosAsync.ListAsync(new GetListCargosConvivenciaSpec(), cancellationToken);

                if (!data.Any())
                    return new ResponseType<List<CargoType>>() { Data = null, Message = "No existen registros agregados", StatusCode = "001", Succeeded = false };


                var response = ProcesoListadoCargo(data);

                return new ResponseType<List<CargoType>>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<List<CargoType>>() { Data = null, Message = CodeMessageResponse.GetMessageByCode("500"), StatusCode = "500", Succeeded = false };
            }
        }

        public static List<CargoType> ProcesoListadoCargo(List<CargoModels> lstTpCl)
        {
            var res = new List<CargoType>();

            foreach (var objTpCl in lstTpCl)
            {
                res.Add(new()
                {
                    CargoId = objTpCl.CargoId,
                    CargoNombre = objTpCl.CargoNombre,
                    UsuarioModificacion = objTpCl.UsuarioModificacion,
                    FechaModificacion = objTpCl.FechaModificacion,
                    FechaCreacion = objTpCl.FechaCreacion,                    
                    UsuarioCreacion = objTpCl.UsuarioCreacion,
                }
                 );
            }


            res = res.OrderBy(x => x.CargoId).ToList();

            return res;
        }

    }

}
