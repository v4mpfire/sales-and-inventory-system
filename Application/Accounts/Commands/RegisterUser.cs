using Application.Core;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Accounts;

public class RegisterUser
{
    public class Command : IRequest<Result<Unit>>
    {
        public required RegisterDTO RegisterDTO { get; set; }
    }

    public class RegisterUserRequestHandler(SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                DisplayName = request.RegisterDTO.DisplayName,
                Email = request.RegisterDTO.Email,
                UserName = request.RegisterDTO.Email,
            };

            await ValidateUserRole(request.RegisterDTO.Role);

            var result = await signInManager.UserManager.CreateAsync(user, request.RegisterDTO.Password);

            if (!result.Succeeded)
            {
                throw new IdentityExceptions(
                    message: "One or more validation errors has occured",
                    type: "RegiterUserFailure",
                    errors: result.Errors);
            }

            await signInManager.UserManager.AddToRoleAsync(user, request.RegisterDTO.Role);

            return Result<Unit>.Success(Unit.Value);
        }

        private async Task ValidateUserRole(string role)
        {
            bool isExist = await roleManager.RoleExistsAsync(role);

            if (!isExist)
            {
                IEnumerable<IdentityError> errors = new List<IdentityError>
                {
                    new()
                    {
                        Code = "UserRole",
                        Description = "Invalid User Role"
                    }
                };

                throw new IdentityExceptions(
                    message: "Invalid user role",
                    type: "InvalidUserRole",
                    errors: errors);
            }
        }
    }
}
