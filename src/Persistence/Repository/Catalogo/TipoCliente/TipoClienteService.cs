using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Commands.CreateTipoCliente;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.TipoCliente;

namespace AngelValdiviezoWebApi.Persistence.Repository.Catalogo.TipoCliente
{
    public class TipoClienteService : ITipoCliente
    {
        private readonly IRepositoryAsync<TipoClienteModels> _repository;

        public TipoClienteService(IRepositoryAsync<TipoClienteModels> repositoryAcontecimientoAsync)
        {
            _repository = repositoryAcontecimientoAsync;
        }

        public async Task<ResponseType<string>> CreateTipoCliente(CreateTipoClienteRequest Request, CancellationToken cancellationToken)
        {
            try
            {
                var marcacionColaborador = DateTime.Now;
                ClienteResponseType objResultFinal = new();

                TipoClienteModels objAcont = new()
                {

                };

                var objResultado = await _repository.AddAsync(objAcont, cancellationToken);
                if (objResultado is null)
                {
                    return new ResponseType<string>() { Message = "No se ha podido registrar su información", StatusCode = "101", Succeeded = true };
                }

                return new ResponseType<string>() { Data = null, Message = "Registro ingresado correctamente", StatusCode = "100", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<string>() { Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102", Succeeded = false };
            }


        }


        public async Task<ResponseType<string>> UpdateTipoCliente(TipoClienteModels Request, CancellationToken cancellationToken)
        {
            try
            {
                await _repository.UpdateAsync(Request, cancellationToken);


                return new ResponseType<string>() { Data = null, Message = "Registro ingresado correctamente", StatusCode = "100", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<string>() { Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102", Succeeded = false };
            }


        }

        public async Task<ResponseType<string>> DeleteTipoCliente(TipoClienteModels Request, CancellationToken cancellationToken)
        {
            try
            {
                await _repository.UpdateAsync(Request, cancellationToken);


                return new ResponseType<string>() { Data = null, Message = "Registro ingresado correctamente", StatusCode = "100", Succeeded = true };

            }
            catch (Exception ex)
            {
                return new ResponseType<string>() { Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102", Succeeded = false };
            }


        }

    }
}
