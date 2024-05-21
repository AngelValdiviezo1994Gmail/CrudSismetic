using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Cliente.Commands.CreateCliente;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.Cargo;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngelValdiviezoWebApi.Application.Features.Cargo.Interfaces
{
    public interface ICargo
    {
        //Task<ResponseType<string>> CreateCargo(CreateCargoRequest Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> UpdateCargo(CargoModels Request, CancellationToken cancellationToken);
        Task<ResponseType<string>> DeleteCargo(CargoModels Request, CancellationToken cancellationToken);
    }
}
