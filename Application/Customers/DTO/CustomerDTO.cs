namespace Application.Customers;

public class CustomerDTO
{
    public int CustomerId { get; set; }
    public required string Name { get; set; }
    public string? Email { get; set; }
}
