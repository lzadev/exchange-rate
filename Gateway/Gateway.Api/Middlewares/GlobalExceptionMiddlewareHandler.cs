using System.Net;
using System.Text.Json;
using Gateway.Api.Models;
using Gateway.Application.Common.Exceptions;

namespace Gateway.Api.Middlewares;

public class GlobalExceptionMiddlewareHandler(RequestDelegate next, ILogger<GlobalExceptionMiddlewareHandler> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception occurred: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        HttpStatusCode statusCode;
        var message = "Internal Server Error, please try again later.";

        switch (exception)
        {
            case NotResultException notResultException:
                statusCode = HttpStatusCode.NotFound;
                message = notResultException.Message;
                break;

            case BadRequestException badRequestException:
                statusCode = HttpStatusCode.BadRequest;
                message = badRequestException.Message;
                break;

            default:
                statusCode = HttpStatusCode.InternalServerError;
                break;
        }

        var errorResponse = new ErrorResponse((int)statusCode, message);

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var json = JsonSerializer.Serialize(errorResponse, new JsonSerializerOptions { WriteIndented = true });
        await context.Response.WriteAsync(json);
    }
}