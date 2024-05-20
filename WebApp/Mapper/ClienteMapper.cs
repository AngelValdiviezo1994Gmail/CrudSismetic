using AngelValdiviezoWebApi.Application.Features.Cliente.Dto;
using AngelValdiviezoWebApi.Domain.Entities;
using AutoMapper;
using WebApp.ViewModel;

namespace WebApp.Mapper
{
    public class ClienteMapper : Profile
    {
        public ClienteMapper()
        {
            CreateMap<ResponsePaged<List<ClienteType>>, ResponsePaged<List<ClienteListViewModel>>>()
            .ReverseMap();

            CreateMap<ClienteType, ClienteViewModel>().ReverseMap();
            CreateMap<ClienteType, ClienteListViewModel>().ReverseMap();
        }
    }
}
