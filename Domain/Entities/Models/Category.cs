namespace Domain.Entities;

public class Category
{
    public int CategoryId { get; set; }
    public required string Name { get; set; }
    public DateTime CreatedAt { get; set; }
    public ICollection<Product> Products { get; set; } = [];
}
