using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Token.Commands.CreateToken;
using AngelValdiviezoWebApi.Application.Features.Token.Commands.CreateTokenCommand;
using AngelValdiviezoWebApi.Application.Features.Token.Commands.ValidateToken;
using AngelValdiviezoWebApi.Application.Features.Token.Commands.ValidateTokenCommand;
using AngelValdiviezoWebApi.Application.Features.Token.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AngelValdiviezoWebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class TokenController : ApiControllerBase
    {
        /// <summary>
        /// Genera un código Token a partir del número de cédula
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>Retorna registro creado con estructura de TokenType </returns>
        /// <remarks>
        /// Ejemplo request:
        ///
        ///     POST /CreateToken
        ///     {
        ///          "Identificacion": "0920693975",
        ///          "password":       "123456",
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Retorna el Token se generó correctamente</response>
        /// <response code="400">Si el registro no se generó</response>
        [HttpPost("CreateToken")]
        [EnableCors("AllowOrigin")]
        [ProducesResponseType(typeof(TokenType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [AllowAnonymous]
        public async Task<IActionResult> CreateToken([FromBody] CreateTokenRequest request, CancellationToken cancellationToken)
        {
            var objResult = await Mediator.Send(new CreateTokenCommand(request), cancellationToken);
            if (objResult is not null && !String.IsNullOrEmpty(objResult.Data))
            {
                return Ok(objResult);
            }
            return Ok(objResult);
        }


        /// <summary>
        /// Valida el Código Token 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>Retorna registro creado con estructura de TokenType </returns>
        /// <remarks>
        /// Ejemplo request:
        ///
        ///     POST /ValidateToken
        ///     {
        ///         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ="
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Retorna si el token es válido</response>
        /// <response code="400">Si el registro es inválido</response>
        [HttpPost("ValidateToken")]
        [ProducesResponseType(typeof(TokenType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<IActionResult> ValidateToken([FromBody] ValidateTokenRequest request, CancellationToken cancellationToken)
        {
            var objResult = await Mediator.Send(new ValidateTokenCommand(request), cancellationToken);
            if (objResult is not null)
            {
                return Ok(objResult);
            }
            var objError = new ResponseType<string>() { Succeeded = false, Message = "Error al validar el Token." };
            return Ok(objError);
        }


    }
}
