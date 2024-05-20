using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Application.Features.Cliente.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Query
{
    public record GetClienteByIdQuery(int id) : IRequest<ResponseType<ClienteType>>;

    public class GetClienteByIdQueryHandler : IRequestHandler<GetClienteByIdQuery, ResponseType<ClienteType>>
    {
        private readonly IRepositoryAsync<ClienteModels> _repositoryAsync;        
        private readonly ILogger<GetClienteByIdQueryHandler> _log;

        public GetClienteByIdQueryHandler(ILogger<GetClienteByIdQueryHandler> log, IRepositoryAsync<ClienteModels> repository, IConfiguration config)
        {
            _log = log;
            _repositoryAsync = repository;
            //_mapper = mapper;
        }

        public async Task<ResponseType<ClienteType>> Handle(GetClienteByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var objCliente = await _repositoryAsync.FirstOrDefaultAsync(new ClienteByIdSpec(request.id), cancellationToken);

                //return new ResponseType<ClienteType>() { Data = _mapper.Map<ClienteType>(objCliente), Succeeded = true, StatusCode = "000", Message = CodeMessageResponse.GetMessageByCode("000") };
                var response = ProcesoObjetoCliente(objCliente);

                return new ResponseType<ClienteType>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };
            }
            catch (Exception e)
            {
                _log.LogError(e, string.Empty);
                return new ResponseType<ClienteType>() { Data = null, Succeeded = true, StatusCode = "500", Message = CodeMessageResponse.GetMessageByCode("500") };
            }
        }

        public static ClienteType ProcesoObjetoCliente(ClienteModels objTpCl)
        {
            var res = new ClienteType
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
            };

            return res;
        }


    }
}
