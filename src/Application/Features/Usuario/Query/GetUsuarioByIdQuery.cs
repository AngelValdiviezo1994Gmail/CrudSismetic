using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.DTO;
using AngelValdiviezoWebApi.Application.Features.Usuario.Specifications;
using AngelValdiviezoWebApi.Domain.Entities.Usuario;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AngelValdiviezoWebApi.Application.Features.Usuario.Query
{
    public record GetUsuarioByIdQuery(int id) : IRequest<ResponseType<UsuarioType>>;

    public class GetUsuarioByIdQueryHandler : IRequestHandler<GetUsuarioByIdQuery, ResponseType<UsuarioType>>
    {
        private readonly IRepositoryAsync<UsuarioModels> _repositoryAsync;
        private readonly ILogger<GetUsuarioByIdQueryHandler> _log;

        public GetUsuarioByIdQueryHandler(ILogger<GetUsuarioByIdQueryHandler> log, IRepositoryAsync<UsuarioModels> repository, IConfiguration config)
        {
            _log = log;
            _repositoryAsync = repository;
        }

        public async Task<ResponseType<UsuarioType>> Handle(GetUsuarioByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var objUsuario = await _repositoryAsync.FirstOrDefaultAsync(new UsuarioByIdSpec(request.id), cancellationToken);

                //return new ResponseType<UsuarioType>() { Data = _mapper.Map<UsuarioType>(objUsuario), Succeeded = true, StatusCode = "000", Message = CodeMessageResponse.GetMessageByCode("000") };
                var response = ProcesoObjetoUsuario(objUsuario);

                return new ResponseType<UsuarioType>() { Data = response, Message = CodeMessageResponse.GetMessageByCode("000"), StatusCode = "000", Succeeded = true };
            }
            catch (Exception e)
            {
                _log.LogError(e, string.Empty);
                return new ResponseType<UsuarioType>() { Data = null, Succeeded = true, StatusCode = "500", Message = CodeMessageResponse.GetMessageByCode("500") };
            }
        }

        public static UsuarioType ProcesoObjetoUsuario(UsuarioModels objTpCl)
        {
            var res = new UsuarioType
            {
                UsuarioId = objTpCl.UsuarioId,
                CargoId = objTpCl.CargoId,
                UsuarioNombre = objTpCl.UsuarioNombre,
                UsuarioFechaNacimiento = objTpCl.UsuarioFechaNacimiento,
                UsuarioEstado = objTpCl.UsuarioEstado,
                PerfilId = objTpCl.PerfilId,
                UsuarioApellido = objTpCl.UsuarioApellido,
                UsuarioDireccion = objTpCl.UsuarioDireccion,
                UsuarioEdad = objTpCl.UsuarioEdad,
                FechaCreacion = objTpCl.FechaCreacion,                
                UsuarioCreacion = objTpCl.UsuarioCreacion,                
                FechaModificacion = objTpCl.FechaModificacion,
                UsuarioModificacion = objTpCl.UsuarioModificacion
            };

            return res;
        }


    }
}
