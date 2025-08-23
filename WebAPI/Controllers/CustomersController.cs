using Application.Customers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class CustomersController (IMediator mediator) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<int>> CreateCustomer(CreateCustomerDTO request)
    {
        return HandleResult(await mediator.Send(new CreateCustomer.Command { CustomerDTO = request }));
    }

    [HttpPut]
    public async Task<ActionResult<Unit>> UpdateCustomer(UpdateCustomerDTO request)
    {
        return HandleResult(await mediator.Send(new UpdateCustomer.Command { CustomerDTO = request }));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomerDTO>> GetCustomer(int id)
    {
        return HandleResult(await mediator.Send(new GetCustomer.Query { CustomerId = id }));
    }

    [HttpGet]
    public async Task<ActionResult<List<CustomerDTO>>> GetCustomers()
    {
        return HandleResult(await mediator.Send(new GetAllCustomers.Query { }));
    }
}
