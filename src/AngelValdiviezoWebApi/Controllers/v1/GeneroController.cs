using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Query;
using AngelValdiviezoWebApi.Application.Features.Genero.Query;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngelValdiviezoWebApi.Controllers.v1
{
    public class GeneroController : ApiControllerBase
    {

        [HttpGet("GetGenero")]
        [EnableCors("AllowOrigin")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGenero()
        {
            var objResult = await Mediator.Send(new GetListaGeneroQuery());

            return Ok(objResult);
        }

    }
}
