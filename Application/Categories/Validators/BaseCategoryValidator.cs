using FluentValidation;

namespace Application.Categories;

public class BaseCategoryValidator <T, TDto> : AbstractValidator<T> where TDto : BaseCategoryDTO
{
    public BaseCategoryValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Name)
            .NotEmpty()
            .WithMessage("Category name is required")
            .MaximumLength(100)
            .WithMessage("Category name must not be greater than 100 characters");
    }
}
