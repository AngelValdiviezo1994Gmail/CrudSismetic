using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using MediatR;

namespace AngelValdiviezoWebApi.Application.Features.Cliente.Commands.UpdateCliente
{
    public record UpdateClienteCommand(int idCliente, String nombreCliente, String apellidoCliente, String numCtaCliente, int saldoCliente, DateTime fechaNacimientoCliente, string direccionCliente, string telefonoCliente,
            string emailCliente, int idTipoCliente, int idEstadoCivilCliente,
            string numIdentificacionCliente, string profesionCliente,
            int idGeneroCliente, string nacionalidadCliente, string usuarioCreacion,
            DateTime fechaCreacion, string usuarioModificacion,
            DateTime fechaModificacion) : IRequest<ResponseType<string>>;
    public class UpdateClienteCommandQuery : IRequestHandler<UpdateClienteCommand, ResponseType<string>>
    {

        private readonly IClientes _repositoryAcontecimiento;

        public UpdateClienteCommandQuery(
           IClientes acontecimientos)
        {
            _repositoryAcontecimiento = acontecimientos;
        }

        public async Task<ResponseType<string>> Handle(UpdateClienteCommand request, CancellationToken cancellationToken)
        {
            try
            {
                ClienteModels acontecimientos = new ClienteModels()
                {
                    UsuarioModificacion = request.usuarioModificacion,
                    ClientApellido = request.apellidoCliente,
                    ClientDireccion = request.direccionCliente,
                    ClientEmail = request.emailCliente,
                    ClientEstadoCivilId = request.idEstadoCivilCliente,
                    ClientFechaNacimiento = request.fechaNacimientoCliente,
                    ClientGeneroId = request.idGeneroCliente,
                    ClientId = request.idCliente,
                    ClientNacionalidad = request.nacionalidadCliente,
                    ClientNombre = request.nombreCliente,
                    ClientNumCta = request.numCtaCliente,
                    ClientNumIdentificacion = request.numIdentificacionCliente,
                    ClientProfesion = request.profesionCliente,
                    ClientSaldo = request.saldoCliente,
                    ClientTelefono = request.telefonoCliente,
                    ClientTipoId = request.idTipoCliente,
                    FechaCreacion = request.fechaCreacion,
                    FechaModificacion = request.fechaModificacion,
                    UsuarioCreacion = request.usuarioCreacion
                };


                var objData1 = await _repositoryAcontecimiento.UpdateCliente(acontecimientos, cancellationToken);



                return new ResponseType<string>() { Succeeded = true, Data = null, Message = CodeMessageResponse.GetMessageByCode("200", "El registro ha sido "), StatusCode = "200" };
            }
            catch (Exception)
            {
                return new ResponseType<string>() { Succeeded = false, Data = null, Message = CodeMessageResponse.GetMessageByCode("201"), StatusCode = "201" };
            }
        }
    }

}
