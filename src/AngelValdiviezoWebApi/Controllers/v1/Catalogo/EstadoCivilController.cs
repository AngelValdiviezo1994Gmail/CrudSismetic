using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Catalogo.EstadoCivil.Query;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Query;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngelValdiviezoWebApi.Controllers.v1.Catalogo
{
    public class EstadoCivilController : ApiControllerBase
    {

        [HttpGet("GetEstadoCivil")]
        [EnableCors("AllowOrigin")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEstadoCivil()
        {
            var objResult = await Mediator.Send(new GetListaEstadoCivilQuery());

            return Ok(objResult);
        }

    }
}
