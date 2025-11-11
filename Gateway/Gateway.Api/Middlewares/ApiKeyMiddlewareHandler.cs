using System.Net;
using System.Text.Json;
using Gateway.Api.Models;

namespace Gateway.Api.Middlewares;

public class ApiKeyMiddlewareHandler(
    RequestDelegate next,
    ILogger<ApiKeyMiddlewareHandler> logger,
    IConfiguration configuration)
{
    private readonly string? _apiKey = configuration["Apikey"];

    public async Task InvokeAsync(HttpContext context)
    {
        if (string.IsNullOrEmpty(_apiKey))
        {
            logger.LogError("API key setting is missing");
            await WriteError(context, "Internal Server Error, please try again later.",
                HttpStatusCode.InternalServerError);
            return;
        }

        if (!context.Request.Headers.TryGetValue("x-api-key", out var key))
        {
            logger.LogError("API key is missing");
            await WriteError(context, "API key is missing", HttpStatusCode.Unauthorized);
            return;
        }

        if (key != _apiKey)
        {
            logger.LogError("API key does not match");
            await WriteError(context, "Invalid API key", HttpStatusCode.Forbidden);
            return;
        }

        await next(context);
    }

    private static async Task WriteError(HttpContext context, string message, HttpStatusCode statusCode)
    {
        var error = new ErrorResponse((int)statusCode, message);

        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        var json = JsonSerializer.Serialize(error, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        });

        await context.Response.WriteAsync(json);
    }
}