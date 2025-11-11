using System.Text.Json;
using Gateway.Api.Middlewares;
using Gateway.Api.Models;
using Gateway.Application;
using Gateway.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errors = context.ModelState
            .Where(e => e.Value?.Errors.Count > 0)
            .Select(e => string.Join(", ", e.Value!.Errors.Select(er => er.ErrorMessage)))
            .ToList();

        var message = errors.Count == 1
            ? errors[0]
            : "Validation failed: " + string.Join("; ", errors);

        var errorResponse = new ErrorResponse(400,message);

        var result = new ContentResult
        {
            StatusCode = 400,
            ContentType = "application/json",
            Content = JsonSerializer.Serialize(errorResponse, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            })
        };

        return result;
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(static s =>
{
    s.SwaggerDoc("v1", new OpenApiInfo { Title = "Exchange Gateway", Version = "v1" });
    s.AddSecurityDefinition("XApiKey", new OpenApiSecurityScheme
    {
        Description = "API Key needed to access the endpoints. Use the header `x-api-key`.",
        Type = SecuritySchemeType.ApiKey,
        Name = "x-api-key",
        In = ParameterLocation.Header,
        Scheme = "ApiKeyScheme"
    });

    s.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "XApiKey"
                    },
                    In = ParameterLocation.Header
                },
                Array.Empty<string>()
            }
        }
    );
});

builder.AddApplication();
builder.AddInfrastructure();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ApiKeyMiddlewareHandler>();
app.UseMiddleware<GlobalExceptionMiddlewareHandler>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();