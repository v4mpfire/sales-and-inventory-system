using Application.Accounts;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class AccountsController(IMediator mediator, SignInManager<User> signInManager) : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterAsync(RegisterDTO request)
    {
        return HandleResult(await mediator.Send(new RegisterUser.Command { RegisterDTO = request }));
    }

    [HttpGet("session")]
    public async Task<ActionResult<UserInfoDTO>> GetUserInfo()
    {
        return HandleResult(await mediator.Send(new GetUserSession.Query()));
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }
}
