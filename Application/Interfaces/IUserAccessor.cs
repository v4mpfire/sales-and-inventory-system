using Domain.Entities;

namespace Application.Interfaces;

public interface IUserAccessor
{
    public string GetUserId();
    public Task<User> GetUserAsync();
}
