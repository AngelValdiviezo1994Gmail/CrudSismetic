using Common.Domain.Wrappers;
using Module.Security.Infraestructure.DTO;

namespace Module.Security.Infraestructure.Interfaces.Client
{
    public interface IAutenticacionClient
    {
        Task<Response<UserDTO>> Loggin(Request<LoginRequestDTO> request);
    }
}
