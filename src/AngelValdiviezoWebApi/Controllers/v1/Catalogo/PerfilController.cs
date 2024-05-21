using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Perfil.Query;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngelValdiviezoWebApi.Controllers.v1.Catalogo
{
    public class PerfilController : ApiControllerBase
    {
        [HttpGet("GetPerfiles")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPerfiles()
        {
            var objResult = await Mediator.Send(new GetListaPerfilQuery());

            return Ok(objResult);
        }

    }
}
