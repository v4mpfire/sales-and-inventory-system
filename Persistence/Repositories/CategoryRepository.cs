using Domain.Entities;
using Microsoft.EntityFrameworkCore;
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

    public async Task<List<Category>> GetCategoriesAsync(CancellationToken cancellationToken)
    {
        var categories = await context.Categories.ToListAsync(cancellationToken);

        return categories;
    }

    public async Task<Category?> GetCategoryAsync(int id, CancellationToken cancellationToken) => await context.Categories.FindAsync(id, cancellationToken);

    public async Task<bool> UpdateCategoryAsync(Category request, CancellationToken cancellationToken)
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        var category = await context.Categories.FindAsync(request.CategoryId);

        if (category == null) return false;

        category.Name = request.Name;

        await context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync();

        return true;
    }
}
