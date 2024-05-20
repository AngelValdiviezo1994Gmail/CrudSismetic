using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Application.Features.Genero.Commands.CreateGenero;
using AngelValdiviezoWebApi.Application.Features.Genero.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Genero;

namespace AngelValdiviezoWebApi.Persistence.Repository.Genero
{
    public class GeneroService : IGenero
    {
        private readonly IRepositoryAsync<GeneroModels> _repository;

        public GeneroService(IRepositoryAsync<GeneroModels> repositoryAcontecimientoAsync)
        {
            _repository = repositoryAcontecimientoAsync;
        }

        public async Task<ResponseType<string>> CreateGenero(CreateGeneroRequest Request, CancellationToken cancellationToken)
        {
            try
            {
                var marcacionColaborador = DateTime.Now;
                ClienteResponseType objResultFinal = new();

                GeneroModels objAcont = new()
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


        public async Task<ResponseType<string>> UpdateGenero(GeneroModels Request, CancellationToken cancellationToken)
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

        public async Task<ResponseType<string>> DeleteGenero(GeneroModels Request, CancellationToken cancellationToken)
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
