using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class ProductRepository(SalesAndInventoryContext context) : IProductRespository
{
    public async Task<int> CreateProductAsync(Product request, CancellationToken cancellationToken)
    {
        var category = await context.Categories.FindAsync(request.CategoryId)
                ?? throw new KeyNotFoundException("Category not found");

        using var transaction = await context.Database.BeginTransactionAsync();
        await context.Products.AddAsync(request);
        await context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync();

        return request.ProductId;
    }

    public async Task<Product?> GetProductAsync(int id, CancellationToken cancellationToken)
    {
        var product = await context.Products
            .Include(x => x.Category)
            .FirstOrDefaultAsync(x => x.ProductId == id, cancellationToken);

        return product;
    }

    public async Task<List<Product>> GetProductsAsync(CancellationToken cancellationToken)
    {
        var products = await context.Products
            .Include(x => x.Category)
            .ToListAsync();

        return products;
    }

    public async Task<bool> UpdateProductAsync(Product request, CancellationToken cancellationToken)
    {
        var category = await context.Categories.FindAsync(request.CategoryId)
                ?? throw new KeyNotFoundException("Category not found");

        using var transaction = await context.Database.BeginTransactionAsync();

        var product = await context.Products.FindAsync(request.ProductId);

        if (product == null) throw new KeyNotFoundException("Product not found"); ;

        product.CategoryId = request.CategoryId;
        product.Name = request.Name;
        product.Barcode = request.Barcode;
        product.Price = request.Price;

        await context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync();

        return true;
    }
}

