namespace Domain.Entities;

public interface ICategoryRepository
{
    Task<int> CreateCategoryAsync(Category request, CancellationToken cancellationToken);
    Task<bool> UpdateCategoryAsync(Category request, CancellationToken cancellationToken);
    Task<Category?> GetCategoryAsync(int id, CancellationToken cancellationToken);
    Task<List<Category>> GetCategoriesAsync(CancellationToken cancellationToken);
}
