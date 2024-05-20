using AutoMapper;
/*
using AngelValdiviezoWebApi.Application.Features.Billeteras.Dto;
using AngelValdiviezoWebApi.Application.Features.Clients.Commands.CreateCliente;
using AngelValdiviezoWebApi.Application.Features.Clients.Dto;
using AngelValdiviezoWebApi.Application.Features.Employees.Dto;
using AngelValdiviezoWebApi.Application.Features.Familiares.Dto;
using AngelValdiviezoWebApi.Application.Features.Horarios.Dto;
using AngelValdiviezoWebApi.Application.Features.MenuAlimentacion.Dto;
using AngelValdiviezoWebApi.Application.Features.Wallets.Dto;
*/
using AngelValdiviezoWebApi.Domain.Dto;
/*
using AngelValdiviezoWebApi.Domain.Entities.Common;
using AngelValdiviezoWebApi.Domain.Entities.Familiares;
using AngelValdiviezoWebApi.Domain.Entities.Horario;
using AngelValdiviezoWebApi.Domain.Entities.MenuSemana;
using AngelValdiviezoWebApi.Domain.Entities.Nomina;
using AngelValdiviezoWebApi.Domain.Entities.Wallet;
*/
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using AngelValdiviezoWebApi.Application.Features.Token.Dto;
using AngelValdiviezoWebApi.Application.Features.Token.Commands.CreateToken;
using AngelValdiviezoWebApi.Application.Features.Token.Commands.CreateTokenCommand;

namespace AngelValdiviezoWebApi.Application.Common.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        /*
        CreateMap<CreateClienteRequest, Cliente>(MemberList.None); 
        CreateMap<Cliente, ClienteType>(); 
        CreateMap<FamiliarColaborador, ClienteType>(); 
        CreateMap<InformacionGeneralEmpleado,InformacionGeneralEmpleadoType>().ReverseMap();
        CreateMap<CertificadoLaboral, CertificadoLaboralType>().ReverseMap();
        CreateMap<AvisoEntrada, AvisoEntradaType>().ReverseMap();
        
        CreateMap<RolPagoCabecera, RolPagoCabeceraType>();
        CreateMap<Rubro, RubroType>();
        CreateMap<RolPago, RolPagoType>();
        CreateMap<Horario, HorarioType>();
        CreateMap<CupoCredito, CupoCreditoResponseType>();
        CreateMap<SaldoContable, SaldoContableResponseType>();
        CreateMap<MenuSemanal, MenuSemanaResponseType>().ReverseMap();
        CreateMap<TipoRelacionFamiliar, ResponseTipoRelacionFamiliarType>();
        CreateMap<FamiliarColaborador, ResponseFamiliarColaboradorType>();
        */
        CreateMap<CreateTokenRequest, TokenType>().ReverseMap();
        //ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
    }

    [ExcludeFromCodeCoverage]
    private void ApplyMappingsFromAssembly(Assembly assembly)
    {
        var mapFromType = typeof(IMapFrom<>);

        var mappingMethodName = nameof(IMapFrom<object>.Mapping);
        [ExcludeFromCodeCoverage]
        bool HasInterface(Type t) => t.IsGenericType && t.GetGenericTypeDefinition() == mapFromType;
        var types = assembly.GetExportedTypes().Where(t => t.GetInterfaces().Any(HasInterface)).ToList();

        var argumentTypes = new Type[] { typeof(Profile) };

        foreach (var type in types)
        {
            var instance = Activator.CreateInstance(type);

            var methodInfo = type.GetMethod(mappingMethodName);

            if (methodInfo != null)
            {
                methodInfo.Invoke(instance, new object[] { this });
            }
            else
            {
                var interfaces = type.GetInterfaces().Where(HasInterface).ToList();

                if (interfaces.Count > 0)
                {
                    foreach (var @interface in interfaces)
                    {
                        var interfaceMethodInfo = @interface.GetMethod(mappingMethodName, argumentTypes);

                        interfaceMethodInfo?.Invoke(instance, new object[] { this });
                    }
                }
            }
        }
    }
}