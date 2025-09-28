using Application.Accounts;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class AccountsController(IMediator mediator) : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterAsync(RegisterDTO request)
    {
        return HandleResult(await mediator.Send(new RegisterUser.Command { RegisterDTO = request }));
    }
}
