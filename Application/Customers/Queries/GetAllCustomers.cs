using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Customers;

public class GetAllCustomers
{
    public class Query : IRequest<Result<List<CustomerDTO>>>
    {

    }

    public class GetAllCustomerRequestHandler (ICustomerRepository customerRepository, IMapper mapper) : IRequestHandler<Query, Result<List<CustomerDTO>>>
    {
        public async Task<Result<List<CustomerDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var customers = await customerRepository.GetCustomersAsync(cancellationToken);

            return Result<List<CustomerDTO>>.Success(mapper.Map<List<CustomerDTO>>(customers));
        }
    }
}
