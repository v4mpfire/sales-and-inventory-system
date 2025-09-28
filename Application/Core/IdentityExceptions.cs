using Microsoft.AspNetCore.Identity;

namespace Application.Core;

public class IdentityExceptions : Exception
{
    public string Type { get; set; }
    public IEnumerable<IdentityError> Errors { get; private set; }

    public IdentityExceptions(string message, string type, IEnumerable<IdentityError> errors) : base(message: message)
    {
        Errors = errors;
        Type = type;
    }
}
