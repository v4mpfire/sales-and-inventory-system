using Application.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class ProductsController(IMediator mediator) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<int>> CreateProduct(CreateProductDTO request)
    {
        return HandleResult(await mediator.Send(new CreateProduct.Command { ProductDTO = request}));
    }

    [HttpPut]
    public async Task<ActionResult<Unit>> UpdateProduct(UpdateProductDTO request)
    {
        return HandleResult(await mediator.Send(new UpdateProduct.Command { ProductDTO = request}));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDTO>> GetProduct(int id)
    {
        return HandleResult(await mediator.Send(new GetProduct.Query { ProductId = id}));
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductDTO>>> GetProducts()
    {
        return HandleResult(await mediator.Send(new GetAllProducts.Query { }));
    }
}
