using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Products;

public class GetProduct
{
    public class Query : IRequest<Result<ProductDTO>>
    {
        public int ProductId { get; set; }
    }

    public class GetProductRequestHandler(IProductRespository productRespository, IMapper mapper) : IRequestHandler<Query, Result<ProductDTO>>
    {
        public async Task<Result<ProductDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            var product = await productRespository.GetProductAsync(request.ProductId, cancellationToken);

            return product != null
                ? Result<ProductDTO>.Success(mapper.Map<ProductDTO>(product))
                : Result<ProductDTO>.Failed("Product not found", 404);
        }
    }
}