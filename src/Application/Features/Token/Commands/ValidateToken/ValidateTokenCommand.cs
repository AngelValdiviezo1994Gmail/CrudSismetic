//using Geocodificacion.Application.Common.Interfaces;
using MediatR;
using AutoMapper;
using AngelValdiviezoWebApi.Application.Features.Token.Commands.ValidateTokenCommand;
using AngelValdiviezoWebApi.Application.Features.Token.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Token.Dto;
using AngelValdiviezoWebApi.Application.Common.Exceptions;

namespace AngelValdiviezoWebApi.Application.Features.Token.Commands.ValidateToken;
//namespace AngelValdiviezoWebApi.Application.Features.Token.Commands.CreateToken;

public record ValidateTokenCommand(ValidateTokenRequest TokenRequest) : IRequest<ResponseType<string>>;


public class ValidateTokenCommandHandler : IRequestHandler<ValidateTokenCommand, ResponseType<string>>
{
    private readonly ITokenService _repositoryAsync;
    private readonly IMapper _mapper;
   
    public ValidateTokenCommandHandler(ITokenService repository, IMapper mapper)
    {
        _repositoryAsync = repository;
        _mapper = mapper;
    }

    public async Task<ResponseType<string>> Handle(ValidateTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entity = _mapper.Map<TokenType>(request.TokenRequest);
            var objResult = await _repositoryAsync.ValidateToken(entity);
            return objResult;
        }
        catch (Exception)
        {

            return new ResponseType<string>() { Message = CodeMessageResponse.GetMessageByCode("102"), Succeeded = false, StatusCode = "102"};
        }

    }
}
