using AngelValdiviezoWebApi.Application.Common.Wrappers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Query;

namespace AngelValdiviezoWebApi.Controllers.v1.Catalogo
{
    public class TipoClienteController : ApiControllerBase
    {

        [HttpGet("GetTipoCliente")]
        [EnableCors("AllowOrigin")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTipoCliente()
        {
            var objResult = await Mediator.Send(new GetListaTipoClienteQuery());

            return Ok(objResult);
        }

    }
}
