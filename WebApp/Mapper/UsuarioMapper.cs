using AngelValdiviezoWebApi.Application.Features.Usuario.DTO;
using AngelValdiviezoWebApi.Domain.Entities;
using AutoMapper;
using WebApp.ViewModel.Usuario;

namespace WebApp.Mapper
{
    public class UsuarioMapper : Profile
    {
        public UsuarioMapper()
        {
            CreateMap<ResponsePaged<List<UsuarioType>>, ResponsePaged<List<UsuarioListViewModel>>>()
            .ReverseMap();

            CreateMap<UsuarioType, UsuarioViewModel>().ReverseMap();
            CreateMap<UsuarioType, UsuarioListViewModel>().ReverseMap();
        }
    }
}
