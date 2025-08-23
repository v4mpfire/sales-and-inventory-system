namespace Domain.Entities;

public class Customer
{
    public int CustomerId { get; set; }
    public required string Name { get; set; }
    public string? Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public ICollection<Sale> Sales { get; set; } = [];
}
