namespace Domain.Entities;

public class Product
{
    public int ProductId { get; set; }
    public int CategoryId { get; set; }
    public string? Barcode { get; set; }
    public required string Name { get; set; }
    public double Price { get; set; }
    public int StockQuantity { get; set; }
    public DateTime CreatedAt { get; set; }

    public virtual Category Category { get; set; } = null!;
    public ICollection<SaleItem> SaleItems { get; set; } = [];
}
