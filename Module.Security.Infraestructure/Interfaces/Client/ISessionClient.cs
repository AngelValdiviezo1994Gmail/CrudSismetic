using Common.Domain.Entities;
using Common.Domain.Wrappers;
using Module.Security.Infraestructure.DTO;

namespace Module.Security.Infraestructure.Interfaces.Client
{
    public interface ISessionClient
    {
        Task<Response<DatosSession>> GetSession(Request<Guid> request);

        Task<Response<DatosSession>> CreateSession(Request<SessionRequestDTO> request);

        Task<Response<bool>> DeleteSession(Request<string> request);
    }
}
