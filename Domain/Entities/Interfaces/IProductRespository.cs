namespace Domain.Entities;

public interface IProductRespository
{
    Task<int> CreateProductAsync(Product request, CancellationToken cancellationToken);
    Task<bool> UpdateProductAsync(Product request, CancellationToken cancellationToken);
    Task<Product?> GetProductAsync(int id,  CancellationToken cancellationToken);
    Task<List<Product>> GetProductsAsync(CancellationToken cancellationToken);
}