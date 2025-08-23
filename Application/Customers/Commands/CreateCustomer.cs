using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Customers;

public class CreateCustomer
{
    public class Command : IRequest<Result<int>>
    {
        public required CreateCustomerDTO CustomerDTO { get; set; }
    }

    public class CreateCustomerRequestHandler(ICustomerRepository customerRepository, IMapper mapper) : IRequestHandler<Command, Result<int>>
    {
        public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
        {
            var customer = mapper.Map<Customer>(request.CustomerDTO);

            int customerId = await customerRepository.CreateCustomerAsync(customer, cancellationToken);

            return customerId != 0
                ? Result<int>.Success(customerId)
                : Result<int>.Failed("Failed to save customer to db", 400);
        }
    }
}
