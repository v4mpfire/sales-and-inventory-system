using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Persistence.Contexts;
using System.Security.Claims;

namespace Infrastructure.Security;

public class UserAccessor(SalesAndInventoryContext dbContext, IHttpContextAccessor httpContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId()) ?? throw new Exception("No user is logged in");
    }

    public string GetUserId() => httpContext.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No user found");
}