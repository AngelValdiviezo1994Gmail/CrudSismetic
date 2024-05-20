
using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Catalogo.TipoCliente.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Cliente.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Genero.Interfaces;
using AngelValdiviezoWebApi.Application.Features.Token.Interfaces;
using AngelValdiviezoWebApi.Persistence.Contexts;
using AngelValdiviezoWebApi.Persistence.Repository;
using AngelValdiviezoWebApi.Persistence.Repository.Catalogo.TipoCliente;
using AngelValdiviezoWebApi.Persistence.Repository.Cliente;
using AngelValdiviezoWebApi.Persistence.Repository.Genero;
using AngelValdiviezoWebApi.Persistence.Repository.Token;
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
        services.AddTransient<ITipoCliente, TipoClienteService>();
        services.AddTransient<ITokenService, TokenService>();
        #endregion

        return services;
    }

}