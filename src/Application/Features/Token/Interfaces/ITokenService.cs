using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Token.Dto;

namespace AngelValdiviezoWebApi.Application.Features.Token.Interfaces
{
    public interface ITokenService
    {
        Task<ResponseType<string>> CreateToken(TokenType request);
        Task<ResponseType<string>> ValidateToken(TokenType request);
    }
}

