using FluentValidation;

namespace Application.Categories;

public class UpdateCategoryValidator : BaseCategoryValidator<UpdateCategory.Command, UpdateCategoryDTO>
{
    public UpdateCategoryValidator() : base(x => x.CategoryDTO)
    {
        RuleFor(x => x.CategoryDTO.CategoryId)
            .NotNull()
            .WithMessage("Category id is required")
            .NotEmpty()
            .WithMessage("Category id is required");
    }
}
