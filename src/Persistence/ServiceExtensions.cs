﻿
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Cargo.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Genero.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Token.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Usuario.Interfaces;
using AngelValdiviezoWebApi.Persistence.Contexts;
using AngelValdiviezoWebApi.Persistence.Repository;
using AngelValdiviezoWebApi.Persistence.Repository.Catalogo.Cargo;
using AngelValdiviezoWebApi.Persistence.Repository.Cliente;
using AngelValdiviezoWebApi.Persistence.Repository.Genero;
using AngelValdiviezoWebApi.Persistence.Repository.Token;
using AngelValdiviezoWebApi.Persistence.Repository.Usuario;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace AngelValdiviezoWebApi.Persistence;
public static class ServiceExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
               builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        #region Repositories

        services.AddTransient(typeof(IRepositoryAsync<>), typeof(CustomRepositoryAsync<>));

        services.AddTransient<IClientes, ClienteService>();
        services.AddTransient<IGenero, GeneroService>();
        services.AddTransient<ICargo, CargoService>();
        services.AddTransient<IUsuario, UsuarioService>();
        services.AddTransient<ITokenService, TokenService>();
        #endregion

        return services;
    }

}