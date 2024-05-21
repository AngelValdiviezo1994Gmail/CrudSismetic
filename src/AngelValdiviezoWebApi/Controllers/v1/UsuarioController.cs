using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Usuario.Commands.CreateUsuario;
using AngelValdiviezoWebApi.Application.Features.Usuario.Commands.DeleteUsuario;
using AngelValdiviezoWebApi.Application.Features.Usuario.Commands.UpdateUsuario;
using AngelValdiviezoWebApi.Application.Features.Usuario.DTO;
using AngelValdiviezoWebApi.Application.Features.Usuario.Query;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngelValdiviezoWebApi.Controllers.v1
{
    public class UsuarioController : ApiControllerBase
    {
        [HttpGet("GetUsuarios")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUsuarios()
        {
            var objResult = await Mediator.Send(new GetListaUsuarioQuery());

            return Ok(objResult);
        }


        [HttpGet("{id:int}")]
        [EnableCors("AllowOrigin")]
        [ProducesResponseType(typeof(UsuarioType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUsuarioById(int id, CancellationToken cancellationToken)
        {
            var query = new GetUsuarioByIdQuery(id);
            var Usuario = await Mediator.Send(query, cancellationToken);
            return Ok(Usuario);
        }

        [HttpPost("CreateUsuario")]
        [EnableCors("AllowOrigin")]
        [ProducesResponseType(typeof(ResponseType<UsuarioResponseType>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateUsuario([FromBody] CreateUsuariosRequest request, CancellationToken cancellationToken)
        {
            var objResult = await Mediator.Send(new CreateUsuarioCommand(request), cancellationToken);
            return Ok(objResult);
        }

        [EnableCors("AllowOrigin")]
        [HttpPut("UpdateUsuario")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateUsuario(int idUsuario, int idCargo, int idPerfil, string apellidoUsuario,
        string direccionUsuario, int edadUsuario, bool estadoUsuario,
        DateTime fechaNacimientoUsuario, string nombreUsuario,
        string usuarioCreacion, DateTime fechaCreacion,
        string usuarioModificacion, DateTime fechaModificacion, CancellationToken cancellationToken)
        {
            var objResult = await Mediator.Send(new UpdateUsuarioCommand(idUsuario, idCargo, idPerfil, apellidoUsuario, direccionUsuario, edadUsuario, estadoUsuario, fechaNacimientoUsuario, nombreUsuario,
                usuarioCreacion, fechaCreacion, usuarioModificacion, fechaModificacion
                ), cancellationToken);
            return Ok(objResult);
        }

        [EnableCors("AllowOrigin")]
        [HttpDelete("EliminaUsuario")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> EliminaUsuario(int IdUsuario, CancellationToken cancellationToken)
        {
            var objResult = await Mediator.Send(new DeleteUsuarioCommand(IdUsuario), cancellationToken);
            return Ok(objResult);
        }

    }
}
