using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WebAPI.Middleware;

public class ExceptionMiddleware (IHostEnvironment environment) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
		try
		{
			await next(context);
		}
		catch (IdentityExceptions ex)
		{
			await HandleIdentityException(context, ex);
		}
		catch (ValidationException ex)
		{
			await HandleValidationException(context, ex);
		}
		catch (Exception ex)
		{
			await HandleExceptions(context, ex);
		}
    }
    private static async Task HandleIdentityException(HttpContext context, IdentityExceptions ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.Code, out var existingErrors))
                {
                    validationErrors[error.Code] = existingErrors.Append(error.Description).ToArray();
                }
                else
                {
                    validationErrors[error.Code] = [error.Description];
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = ex.Type,
            Title = "Validation error",
            Detail = ex.Message
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }

    public static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

		if (ex.Errors is not null)
		{
			foreach (var error in ex.Errors)
			{
				if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
				{
					validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
				}
				else
				{
					validationErrors[error.PropertyName] = [error.ErrorMessage];
				}
			}
		}

		context.Response.StatusCode = StatusCodes.Status400BadRequest;

		var validationProblemDetails = new ValidationProblemDetails(validationErrors)
		{
			Status = StatusCodes.Status400BadRequest,
			Type = "ValidationFailure",
			Title = "Valitaion error",
			Detail = "One or more validation errors has occured"
		};

		await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }

    private async Task HandleExceptions(HttpContext context, Exception ex)
    {
		context.Response.ContentType = "application/json";
		context.Response.StatusCode = StatusCodes.Status500InternalServerError;

		var response = environment.IsDevelopment()
			? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
			: new AppException(context.Response.StatusCode, ex.Message, null);

        var options = new JsonSerializerOptions
		{
			PropertyNamingPolicy = JsonNamingPolicy.CamelCase
		};

		var json = JsonSerializer.Serialize(response, options);

		await context.Response.WriteAsync(json);
    }
}
