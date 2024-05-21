using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Application.Features.Cargo.Interfaces;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.Cargo;

namespace AngelValdiviezoWebApi.Persistence.Repository.Catalogo.Cargo
{
    public class CargoService : ICargo
    {
        private readonly IRepositoryAsync<CargoModels> _repository;

        public CargoService(IRepositoryAsync<CargoModels> repositoryAcontecimientoAsync)
        {
            _repository = repositoryAcontecimientoAsync;
        }

        
        public async Task<ResponseType<string>> UpdateCargo(CargoModels Request, CancellationToken cancellationToken)
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

        public async Task<ResponseType<string>> DeleteCargo(CargoModels Request, CancellationToken cancellationToken)
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
