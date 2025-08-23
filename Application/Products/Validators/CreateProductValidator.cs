namespace Application.Products;

public class CreateProductValidator : BaseProductValidator<CreateProduct.Command, CreateProductDTO>
{
    public CreateProductValidator() : base(x => x.ProductDTO)
    {
        
    }
}