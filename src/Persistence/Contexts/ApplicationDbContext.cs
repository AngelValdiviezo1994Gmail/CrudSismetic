
using AngelValdiviezoWebApi.Domain.Entities.Catalogo.Cargo;
using AngelValdiviezoWebApi.Domain.Entities.Cliente;
using AngelValdiviezoWebApi.Domain.Entities.Genero;
using AngelValdiviezoWebApi.Domain.Entities.Perfil;
using AngelValdiviezoWebApi.Domain.Entities.Usuario;
using Microsoft.EntityFrameworkCore;
namespace AngelValdiviezoWebApi.Persistence.Contexts;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }
    
    public DbSet<ClienteModels> clienteModels => Set<ClienteModels>();    
    public DbSet<CargoModels> cargoModels => Set<CargoModels>();
    public DbSet<PerfilModels> perfilModels => Set<PerfilModels>();
    public DbSet<UsuarioModels> usuarioModels => Set<UsuarioModels>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }

}