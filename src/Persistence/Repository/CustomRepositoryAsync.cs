using AngelValdiviezoWebApi.Application.Common.Interfaces;
using AngelValdiviezoWebApi.Persistence.Contexts;
using Ardalis.Specification.EntityFrameworkCore;

namespace AngelValdiviezoWebApi.Persistence.Repository
{
    public class CustomRepositoryAsync<T> : RepositoryBase<T>, IRepositoryAsync<T> where T : class
    {
        private readonly ApplicationDbContext dbContext;

        public CustomRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
