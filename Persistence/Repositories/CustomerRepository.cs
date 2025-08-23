using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;

namespace Persistence.Repositories;

public class CustomerRepository(SalesAndInventoryContext context) : ICustomerRepository
{
    public async Task<int> CreateCustomerAsync(Customer request, CancellationToken cancellationToken)
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        await context.Customers.AddAsync(request);
        await context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync();

        return request.CustomerId;
    }

    public async Task<Customer?> GetCustomerAsync(int id, CancellationToken cancellationToken) => await context.Customers.FindAsync(id, cancellationToken);

    public async Task<List<Customer>> GetCustomersAsync(CancellationToken cancellationToken)
    {
        var customers = await context.Customers.ToListAsync(cancellationToken);

        return customers;
    }

    public async Task<bool> UpdateCustomerAsync(Customer request, CancellationToken cancellationToken)
    {
        var customer = await context.Customers.FindAsync(request.CustomerId);

        if (customer == null) return false;

        using var transaction = await context.Database.BeginTransactionAsync();

        customer.Name = request.Name;
        customer.Email = request.Email;

        await context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync();

        return true;
    }
}
