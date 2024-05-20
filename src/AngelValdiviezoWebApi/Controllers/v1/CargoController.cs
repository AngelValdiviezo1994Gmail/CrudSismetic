using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Query;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngelValdiviezoWebApi.Controllers.v1
{
    public class CargoController : ApiControllerBase
    {
        [HttpGet("GetClientes")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetClientes()
        {
            var objResult = await Mediator.Send(new GetListaClienteQuery());

            return Ok(objResult);
        }

    }
}