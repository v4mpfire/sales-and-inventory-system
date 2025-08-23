using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Products;

public class GetAllProducts
{
    public class Query : IRequest<Result<List<ProductDTO>>>
    {

    }

    public class GetAllProductsRequestHandler (IProductRespository productRespository, IMapper mapper) : IRequestHandler<Query, Result<List<ProductDTO>>>
    {
        public async Task<Result<List<ProductDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var products = await productRespository.GetProductsAsync(cancellationToken);

            return Result<List<ProductDTO>>.Success(mapper.Map<List<ProductDTO>>(products));
        }
    }
}
