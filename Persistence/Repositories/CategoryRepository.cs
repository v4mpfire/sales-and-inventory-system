using Domain.Entities;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class CategoryRepository(SalesAndInventoryContext context) : ICategoryRepository
{
    public async Task<int> CreateCategoryAsync(Category request, CancellationToken cancellationToken)
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        await context.Categories.AddAsync(request);
        await context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync();

        return request.CategoryId;
    }
}
