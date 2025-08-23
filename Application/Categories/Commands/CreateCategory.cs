using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Categories;

public class CreateCategory
{
    public class Command : IRequest<Result<int>>
    {
        public required CreateCategoryDTO CategoryDTO { get; set; }
    }

    public class CommandRequestHandler(ICategoryRepository categoryRepository, IMapper mapper) : IRequestHandler<Command, Result<int>>
    {
        public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
        {
            var category = mapper.Map<Category>(request.CategoryDTO);

            int categoryId = await categoryRepository.CreateCategoryAsync(category, cancellationToken);

            return categoryId == 0
                ? Result<int>.Failed("Failed to create category", 400)
                : Result<int>.Success(categoryId);
        }
    }
}
