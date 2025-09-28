using FluentValidation;

namespace Application.Accounts;

public class RegisterValidations : AbstractValidator<RegisterUser.Command>
{
    public RegisterValidations()
    {
        RuleFor(x => x.RegisterDTO.DisplayName)
            .NotEmpty()
            .WithMessage("Display name is required");

        RuleFor(x => x.RegisterDTO.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Invalid email format.");

        RuleFor(x => x.RegisterDTO.Password)
            .NotEmpty()
            .WithMessage("Password is required.");

        RuleFor(x => x.RegisterDTO.Role)
            .NotEmpty()
            .WithMessage("Role is required.");
    }
}
