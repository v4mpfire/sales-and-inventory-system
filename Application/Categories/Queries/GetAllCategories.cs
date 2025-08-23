using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Categories;

public class GetAllCategories
{
    public class Query : IRequest<Result<List<CategoryDTO>>>
    {

    }

    public class GetAllCategoriesRequestHandler(ICategoryRepository categoryRepository, IMapper mapper) : IRequestHandler<Query, Result<List<CategoryDTO>>>
    {
        public async Task<Result<List<CategoryDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var categories = await categoryRepository.GetCategoriesAsync(cancellationToken);

            return Result<List<CategoryDTO>>.Success(mapper.Map<List<CategoryDTO>>(categories));
        }
    }
}
