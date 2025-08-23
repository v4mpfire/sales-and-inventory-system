using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Categories;

public class GetCategory
{
    public class Query : IRequest<Result<CategoryDTO>>
    {
        public required int CategoryId { get; set; }
    }

    public class GetCategoryRequestHandler(ICategoryRepository categoryRepository, IMapper mapper) : IRequestHandler<Query, Result<CategoryDTO>>
    {
        public async Task<Result<CategoryDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            var category = await categoryRepository.GetCategoryAsync(request.CategoryId, cancellationToken);

            return category != null
                ? Result<CategoryDTO>.Success(mapper.Map<CategoryDTO>(category))
                : Result<CategoryDTO>.Failed("Category not found", 404);
        }
    }
}
