
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.EstadoCivil;
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.TipoCliente;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using AngelValdiviezoWebApi.Domain.Entities.Genero;
using Microsoft.EntityFrameworkCore;
namespace AngelValdiviezoWebApi.Persistence.Contexts;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }
    
    public DbSet<ClienteModels> clienteModels => Set<ClienteModels>();
    public DbSet<GeneroModels> generoModels => Set<GeneroModels>();
    public DbSet<TipoClienteModels> tipoClienteModels => Set<TipoClienteModels>();
    public DbSet<EstadoCivilModels> EstadoCivilModels => Set<EstadoCivilModels>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }

}