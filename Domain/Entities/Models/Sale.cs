namespace Domain.Entities;

public class Sale
{
    public int SaleId { get; set; }
    public int? CustomerId { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime SaleDate { get; set; }
    public required string Status { get; set; } = Enums.Status.Pending.ToString();

    public virtual Customer Customer { get; set; } = null!;
    public ICollection<SaleItem> SaleItems { get; set; } = [];
}
