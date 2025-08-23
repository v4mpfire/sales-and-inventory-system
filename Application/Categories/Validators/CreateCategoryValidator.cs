using FluentValidation;

namespace Application.Categories;

public class CreateCategoryValidator : AbstractValidator<CreateCategory.Command>
{
	public CreateCategoryValidator()
	{
		RuleFor(x => x.CategoryDTO.Name)
			.NotEmpty()
			.WithMessage("Category name is required")
			.MaximumLength(100)
			.WithMessage("Category name must not be greater than 100 characters");
	}
}
