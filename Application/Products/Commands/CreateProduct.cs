using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Products;

public class CreateProduct
{
    public class Command : IRequest<Result<int>>
    {
        public required CreateProductDTO ProductDTO { get; set; }
    }

    public class CreateProductRequestHandler(IProductRespository productRespository, IMapper mapper) : IRequestHandler<Command, Result<int>>
    {
        public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
        {
            try
            {
                var product = mapper.Map<Product>(request.ProductDTO);
                var productId = await productRespository.CreateProductAsync(product, cancellationToken);

                return productId != 0
                    ? Result<int>.Success(productId)
                    : Result<int>.Failed("Failed to save product to db", 400);
            }
            catch (KeyNotFoundException ex)
            {
                return Result<int>.Failed(ex.Message, 404);
            }
        }
    }
}
