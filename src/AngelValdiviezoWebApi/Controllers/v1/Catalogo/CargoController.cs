using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cargo.Query;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngelValdiviezoWebApi.Controllers.v1.Catalogo
{
    public class CargoController : ApiControllerBase
    {
        [HttpGet("GetCargos")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCargos()
        {
            var objResult = await Mediator.Send(new GetListaCargoQuery());

            return Ok(objResult);
        }

    }
}
