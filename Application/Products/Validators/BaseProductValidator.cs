using FluentValidation;

namespace Application.Products;

public class BaseProductValidator <T, TDto> : AbstractValidator<T> where TDto : BaseProductDTO 
{
    public BaseProductValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).CategoryId)
            .NotEqual(0)
            .WithMessage("Category id is required");

        RuleFor(x => selector(x).Name)
            .NotEmpty()
            .WithMessage("Product name is required")
            .MaximumLength(150)
            .WithMessage("Product name must not greater than 150 characters");

        RuleFor(x => selector(x).Barcode)
            .MaximumLength(150)
            .WithMessage("Product barcode must not greater than 150 characters");

        RuleFor(x => selector(x).Price)
            .NotEqual(0)
            .WithMessage("Price is required")
            .GreaterThanOrEqualTo(0)
            .WithMessage("Price must be zero or greater.");

        RuleFor(x => selector(x).StockQuantity)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Stock quantity must be zero or greater.");
    }
}
