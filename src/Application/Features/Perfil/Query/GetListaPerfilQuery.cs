using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Perfil.DTO;
using AngelValdiviezoWebApi.Application.Features.Perfil.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Perfil;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Perfil.Query
{

    public record GetListaPerfilQuery() : IRequest<ResponseType<List<PerfilType>>>;

    public class GetListaPerfilQueryHandler : IRequestHandler<GetListaPerfilQuery, ResponseType<List<PerfilType>>>
    {
        private readonly IRepositoryAsync<PerfilModels> _repositoryEventosAsync;

        public GetListaPerfilQueryHandler(IRepositoryAsync<PerfilModels> repositoryEvAsync)
        {
            _repositoryEventosAsync = repositoryEvAsync;
        }

        public async Task<ResponseType<List<PerfilType>>> Handle(GetListaPerfilQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _repositoryEventosAsync.ListAsync(new GetListPerfilesConvivenciaSpec(), cancellationToken);

                if (!data.Any())
                    return new ResponseType<List<PerfilType>>() { Data = null, Message = "No existen registros agregados", StatusCode = "001", Succeeded = false };


                var response = ProcesoListadoPerfil(data);

                return new ResponseType<List<PerfilType>>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<List<PerfilType>>() { Data = null, Message = CodeMessageResponse.GetMessageByCode("500"), StatusCode = "500", Succeeded = false };
            }
        }

        public static List<PerfilType> ProcesoListadoPerfil(List<PerfilModels> lstTpCl)
        {
            var res = new List<PerfilType>();

            foreach (var objTpCl in lstTpCl)
            {
                res.Add(new()
                {
                    PerfilId = objTpCl.PerfilId,
                    PerfilNombre = objTpCl.PerfilNombre,
                    UsuarioModificacion = objTpCl.UsuarioModificacion,
                    FechaModificacion = objTpCl.FechaModificacion,
                    FechaCreacion = objTpCl.FechaCreacion,
                    UsuarioCreacion = objTpCl.UsuarioCreacion,
                }
                 );
            }


            res = res.OrderBy(x => x.PerfilId).ToList();

            return res;
        }

    }

}
