using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Commands.CreateCliente;
using AngelValdiviezoWebApi.Application.Features.Cliente.Commands.DeleteCliente;
using AngelValdiviezoWebApi.Application.Features.Cliente.Commands.UpdateCliente;
using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Application.Features.Cliente.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AngelValdiviezoWebApi.Controllers.v1
{
    public class ClienteController : ApiControllerBase
    {
        [HttpGet("GetClientes")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]        
        public async Task<IActionResult> GetClientes()
        {
            var objResult = await Mediator.Send(new GetListaClienteQuery());

            return Ok(objResult);
        }


        [HttpGet("{id:int}")]
        [EnableCors("AllowOrigin")]
        [ProducesResponseType(typeof(ClienteType), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]        
        public async Task<IActionResult> GetClienteById(int id, CancellationToken cancellationToken)
        {
            var query = new GetClienteByIdQuery(id);
            var cliente = await Mediator.Send(query, cancellationToken);
            return Ok(cliente);
        }

        [HttpPost("CreateCliente")]
        [EnableCors("AllowOrigin")]
        [ProducesResponseType(typeof(ResponseType<ClienteResponseType>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]                
        public async Task<IActionResult> CreateCliente([FromBody] CreateClientesRequest request, CancellationToken cancellationToken)
        {
            var objResult = await Mediator.Send(new CreateClientesCommand(request), cancellationToken);
            return Ok(objResult);
        }

        [EnableCors("AllowOrigin")]
        [HttpPut("UpdateCliente")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]        
        public async Task<IActionResult> UpdateCliente(int idCliente, String nombreCliente, String apellidoCliente, String numCtaCliente, int saldoCliente, DateTime fechaNacimientoCliente, string direccionCliente, string telefonoCliente, 
            string emailCliente, int idTipoCliente, int idEstadoCivilCliente,
            string numIdentificacionCliente, string profesionCliente, 
            int idGeneroCliente, string nacionalidadCliente, string usuarioCreacion,
            DateTime fechaCreacion, string usuarioModificacion, 
            DateTime fechaModificacion, CancellationToken cancellationToken)
        {
            var objResult = await Mediator.Send(new UpdateClienteCommand(idCliente, nombreCliente, apellidoCliente, numCtaCliente, saldoCliente, fechaNacimientoCliente, direccionCliente, telefonoCliente, emailCliente, idTipoCliente, idEstadoCivilCliente,
                numIdentificacionCliente, profesionCliente, idGeneroCliente,
                nacionalidadCliente, usuarioCreacion, fechaCreacion, usuarioModificacion,
                fechaModificacion), cancellationToken);
            return Ok(objResult);
        }

        [EnableCors("AllowOrigin")]
        [HttpDelete("EliminaCliente")]
        [ProducesResponseType(typeof(ResponseType<string>), StatusCodes.Status200OK)]        
        public async Task<IActionResult> EliminaCliente(int IdCliente, CancellationToken cancellationToken)
        {
            var objResult = await Mediator.Send(new DeleteClienteCommand(IdCliente), cancellationToken);
            return Ok(objResult);
        }

    }
}
