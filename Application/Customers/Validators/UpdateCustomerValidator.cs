using FluentValidation;

namespace Application.Customers;

public class UpdateCustomerValidator : BaseCustomerValidator<UpdateCustomer.Command, UpdateCustomerDTO>
{
    public UpdateCustomerValidator() : base(x => x.CustomerDTO)
    {
        RuleFor(x => x.CustomerDTO.CustomerId)
            .NotEqual(0)
            .WithMessage("Customer id is required");
    }
}
