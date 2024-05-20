
using MediatR;
using AutoMapper;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Features.Token.Commands.CreateTokenCommand;
using AngelValdiviezoWebApi.Application.Features.Genero.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Token.Dto;
using AngelValdiviezoWebApi.Application.Features.Token.Interfaces;

namespace AngelValdiviezoWebApi.Application.Features.Token.Commands.CreateToken;

public record CreateTokenCommand(CreateTokenRequest TokenRequest) : IRequest<ResponseType<string>>;


public class CreateTokenCommandHandler : IRequestHandler<CreateTokenCommand, ResponseType<string>>
{
    private readonly ITokenService _repositoryAsync;
    private readonly IMapper _mapper;
   
    public CreateTokenCommandHandler(ITokenService repository, IMapper mapper)
    {
        _repositoryAsync = repository;
        _mapper = mapper;
    }

    public async Task<ResponseType<string>> Handle(CreateTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entity = _mapper.Map<TokenType>(request.TokenRequest);
            var objResult = await _repositoryAsync.CreateToken(entity);
            return objResult;
        }
        catch (Exception ex)
        {

            return new ResponseType<string>() { Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102", Succeeded = false };
        }

    }
}
