using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Products;

public class UpdateProduct
{
    public class Command : IRequest<Result<Unit>>
    {
        public required UpdateProductDTO ProductDTO { get; set; }
    }

    public class UpdateProductRewquestHandler(IProductRespository productRespository, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            try
            {
                var product = mapper.Map<Product>(request.ProductDTO);
                bool isSuccess = await productRespository.UpdateProductAsync(product, cancellationToken);

                return isSuccess
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failed("Failed to save product to db", 400);
            }
            catch (KeyNotFoundException ex)
            {
                return Result<Unit>.Failed(ex.Message, 404);
            }
        }
    }
}