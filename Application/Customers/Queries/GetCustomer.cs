using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Customers;

public class GetCustomer
{
    public class Query : IRequest<Result<CustomerDTO>>
    {
        public int CustomerId { get; set; }
    }

    public class GetCustomerRequestHandler (ICustomerRepository customerRepository, IMapper mapper) : IRequestHandler<Query, Result<CustomerDTO>>
    {
        public async Task<Result<CustomerDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            var customer = await customerRepository.GetCustomerAsync(request.CustomerId, cancellationToken);

            return customer != null
                ? Result<CustomerDTO>.Success(mapper.Map<CustomerDTO>(customer))
                : Result<CustomerDTO>.Failed("Customer not found", 404);
        }
    }
}
