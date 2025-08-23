using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Customers;

public class UpdateCustomer
{
    public class Command : IRequest<Result<Unit>>
    {
        public required UpdateCustomerDTO CustomerDTO { get; set; }
    }

    public class UpdateCustomerRequestHandler (ICustomerRepository customerRepository, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var customer = mapper.Map<Customer>(request.CustomerDTO);

            bool isSuccess = await customerRepository.UpdateCustomerAsync(customer, cancellationToken);

            return isSuccess
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failed("Failed to update customer to db", 404);
        }
    }
}
