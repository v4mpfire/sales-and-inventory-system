using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Categories;

public class UpdateCategory
{
    public class Command : IRequest<Result<Unit>>
    {
        public required UpdateCategoryDTO CategoryDTO { get; set; }
    }

    public class UpdateCategoryRequestHandler(ICategoryRepository categoryRepository, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var category = mapper.Map<Category>(request.CategoryDTO);
            var results = await categoryRepository.UpdateCategoryAsync(category, cancellationToken);

            return results
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failed("Category was not found", 404);
        }
    }
}
