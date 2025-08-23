namespace Domain.Entities;

public interface ICustomerRepository
{
    Task<int> CreateCustomerAsync(Customer request, CancellationToken cancellationToken);
    Task<bool> UpdateCustomerAsync(Customer request, CancellationToken cancellationToken);
    Task<Customer?> GetCustomerAsync(int id, CancellationToken cancellationToken);
    Task<List<Customer>> GetCustomersAsync(CancellationToken cancellationToken);
}
