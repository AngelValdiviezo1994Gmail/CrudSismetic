using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.DTO;
using AngelValdiviezoWebApi.Application.Features.Usuario.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Usuario;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Query
{
    public record GetListaUsuarioQuery() : IRequest<ResponseType<List<UsuarioType>>>;

    public class GetListaUsuarioQueryHandler : IRequestHandler<GetListaUsuarioQuery, ResponseType<List<UsuarioType>>>
    {
        private readonly IRepositoryAsync<UsuarioModels> _repositoryEventosAsync;

        public GetListaUsuarioQueryHandler(IRepositoryAsync<UsuarioModels> repositoryEvAsync)
        {
            _repositoryEventosAsync = repositoryEvAsync;
        }

        public async Task<ResponseType<List<UsuarioType>>> Handle(GetListaUsuarioQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _repositoryEventosAsync.ListAsync(new GetListUsuariosConvivenciaSpec(), cancellationToken);

                if (!data.Any())
                    return new ResponseType<List<UsuarioType>>() { Data = null, Message = "No existen registros agregados", StatusCode = "001", Succeeded = false };


                var response = ProcesoListadoUsuario(data);

                return new ResponseType<List<UsuarioType>>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<List<UsuarioType>>() { Data = null, Message = CodeMessageResponse.GetMessageByCode("500"), StatusCode = "500", Succeeded = false };
            }
        }

        public static List<UsuarioType> ProcesoListadoUsuario(List<UsuarioModels> lstTpCl)
        {
            var res = new List<UsuarioType>();

            foreach (var objTpCl in lstTpCl)
            {
                res.Add(new()
                {
                    UsuarioId = objTpCl.UsuarioId,
                    UsuarioNombre = objTpCl.UsuarioNombre,
                    UsuarioModificacion = objTpCl.UsuarioModificacion,
                    FechaModificacion = objTpCl.FechaModificacion,
                    FechaCreacion = objTpCl.FechaCreacion,
                    UsuarioCreacion = objTpCl.UsuarioCreacion,
                    CargoId = objTpCl.CargoId,
                    PerfilId = objTpCl.PerfilId,
                    UsuarioApellido = objTpCl.UsuarioApellido,
                    UsuarioDireccion = objTpCl.UsuarioDireccion,
                    UsuarioEdad = objTpCl.UsuarioEdad,
                    UsuarioEstado = objTpCl.UsuarioEstado,
                    UsuarioFechaNacimiento = objTpCl.UsuarioFechaNacimiento
                }
                 );
            }


            res = res.OrderBy(x => x.UsuarioId).ToList();

            return res;
        }

    }

}
