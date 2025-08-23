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
}
