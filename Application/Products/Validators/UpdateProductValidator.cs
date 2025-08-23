using FluentValidation;

namespace Application.Products.Validators;

public class UpdateProductValidator : BaseProductValidator<UpdateProduct.Command, UpdateProductDTO>
{
    public UpdateProductValidator() : base(x => x.ProductDTO)
    {
        RuleFor(x => x.ProductDTO.ProductId)
            .NotEqual(0)
            .WithMessage("Product id is required");
    }
}
