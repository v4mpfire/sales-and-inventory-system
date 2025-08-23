namespace Domain.Entities;

public interface ICategoryRepository
{
    Task<int> CreateCategoryAsync(Category request, CancellationToken cancellationToken);
}
