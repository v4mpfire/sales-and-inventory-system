using Application.Categories;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class CategoriesController(IMediator mediator) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<int>> CreateCategory(CreateCategoryDTO request)
    {
        return HandleResult(await mediator.Send(new CreateCategory.Command { CategoryDTO = request }));
    }

    [HttpPut]
    public async Task<ActionResult<Unit>> UpdateCategory(UpdateCategoryDTO request)
    {
        return HandleResult(await mediator.Send(new UpdateCategory.Command { CategoryDTO = request}));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
    {
        return HandleResult(await mediator.Send(new GetCategory.Query { CategoryId = id}));
    }

    [HttpGet]
    public async Task<ActionResult<List<CategoryDTO>>> GetCategories()
    {
        return HandleResult(await mediator.Send(new GetAllCategories.Query {}));
    }
}
