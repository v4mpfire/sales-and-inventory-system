using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(
        SalesAndInventoryContext context,
        UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        await CreateSeedRoles(roleManager);
        await CreateSeedUsers(userManager);
    }

    private static async Task CreateSeedUsers(UserManager<User> userManager)
    {
        if (userManager.Users.Any()) return;

        var users = new List<User>()
        {
            new()
            {
                DisplayName = "Tom",
                UserName = "tomtom@gmail.com",
                Email = "tomtom@gmail.com",
            },
            new()
            {
                DisplayName = "Tri",
                UserName = "tri@gmail.com",
                Email = "tri@gmail.com",
            },
        };

        foreach (var user in users)
        {
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Admin");
        }
    }

    private static async Task CreateSeedRoles(RoleManager<IdentityRole> roleManager)
    {
        var roles = new[]
        {
            "Admin",
            "Cashier"
        };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
}
