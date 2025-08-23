namespace Application.Products;

public class ProductDTO
{
    public int ProductId { get; set; }
    public int CategoryId { get; set; }
    public required string CategoryName { get; set; }
    public string? Barcode { get; set; }
    public required string Name { get; set; }
    public double Price { get; set; }
    public int StockQuantity { get; set; }
}
