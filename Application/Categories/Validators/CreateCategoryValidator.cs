namespace Application.Categories;

public class CreateCategoryValidator : BaseCategoryValidator<CreateCategory.Command, CreateCategoryDTO>
{
	public CreateCategoryValidator() : base(x => x.CategoryDTO)
	{
	}
}
