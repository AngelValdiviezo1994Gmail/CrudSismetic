
using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Application.Features.Cliente.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Query
{
    public record GetListaClienteQuery() : IRequest<ResponseType<List<ClienteType>>>;

    public class GetListaClienteQueryHandler : IRequestHandler<GetListaClienteQuery, ResponseType<List<ClienteType>>>
    {
        private readonly IRepositoryAsync<ClienteModels> _repositoryEventosAsync;

        public GetListaClienteQueryHandler(IRepositoryAsync<ClienteModels> repositoryEvAsync)
        {
            _repositoryEventosAsync = repositoryEvAsync;
        }

        public async Task<ResponseType<List<ClienteType>>> Handle(GetListaClienteQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _repositoryEventosAsync.ListAsync(new GetListClientesConvivenciaSpec(), cancellationToken);

                if (!data.Any())
                    return new ResponseType<List<ClienteType>>() { Data = null, Message = "No existen registros agregados", StatusCode = "001", Succeeded = false };


                var response = ProcesoListadoCliente(data);

                return new ResponseType<List<ClienteType>>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<List<ClienteType>>() { Data = null, Message = CodeMessageResponse.GetMessageByCode("500"), StatusCode = "500", Succeeded = false };
            }
        }

        public static List<ClienteType> ProcesoListadoCliente(List<ClienteModels> lstTpCl)
        {
            var res = new List<ClienteType>();

            foreach (var objTpCl in lstTpCl)
            {
                res.Add(new()
                {
                    ClientId = objTpCl.ClientId,
                    ClientApellido = objTpCl.ClientApellido,
                    ClientDireccion = objTpCl.ClientDireccion,
                    FechaCreacion = objTpCl.FechaCreacion,
                    ClientEmail = objTpCl.ClientEmail,
                    UsuarioCreacion = objTpCl.UsuarioCreacion,
                    ClientEstadoCivilId = objTpCl.ClientEstadoCivilId,
                    ClientFechaNacimiento = objTpCl.ClientFechaNacimiento,
                    ClientGeneroId = objTpCl.ClientGeneroId,
                    ClientNacionalidad = objTpCl.ClientNacionalidad,
                    ClientNombre = objTpCl.ClientNombre,
                    ClientNumCta = objTpCl.ClientNumCta,
                    ClientNumIdentificacion = objTpCl.ClientNumIdentificacion,
                    ClientProfesion = objTpCl.ClientProfesion,
                    ClientSaldo = objTpCl.ClientSaldo,
                    ClientTelefono = objTpCl.ClientTelefono,
                    ClientTipoId = objTpCl.ClientTipoId,
                    FechaModificacion = objTpCl.FechaModificacion,
                    UsuarioModificacion = objTpCl.UsuarioModificacion
                }
                 );
            }


            res = res.OrderBy(x => x.ClientId).ToList();

            return res;
        }

    }

}
