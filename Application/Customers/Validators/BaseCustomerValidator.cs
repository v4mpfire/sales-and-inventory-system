using FluentValidation;

namespace Application.Customers;

public class BaseCustomerValidator <T, TDto> : AbstractValidator<T> where TDto : BaseCustomerDTO
{
    public BaseCustomerValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Name)
            .NotEmpty()
            .WithMessage("Customer name is required")
            .MaximumLength(150)
            .WithMessage("Customer name must not be greater than 150 characters");

        RuleFor(x => selector(x).Email)
            .MaximumLength(250)
            .WithMessage("Customer email address must not be greater than 250 characters")
            .EmailAddress()
            .WithMessage("Invalid email address format")
            .When(x => (!string.IsNullOrWhiteSpace(selector(x).Email) && !string.IsNullOrEmpty(selector(x).Email)));
    }
}