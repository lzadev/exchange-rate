using System.Text.Json;
using Gateway.Application.Common.Interfaces;
using Gateway.Infrastructure.Models;
using Gateway.Infrastructure.Providers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Gateway.Infrastructure;

public static class Extension
{
    public static void AddInfrastructure(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;

        services.AddScoped<IProvider, AltairProvider>();
        // services.AddScoped<IProvider, MercurioProvider>();
        services.AddScoped<IProvider, OrionProvider>();
        
        services.Configure<JsonSerializerOptions>(options =>
        {
            options.PropertyNameCaseInsensitive = true;
        });
        
        //add http client factory

        var settings = configuration.GetSection("ProviderSetting").Get<ProviderSetting>();
        
        ValidateSettings(settings);
        
        services.AddHttpClient(Constants.AltairClientName,
            client =>
            {
                client.BaseAddress = new Uri(settings.AltairBaseUrl);
                client.DefaultRequestHeaders.Add("x-api-key",settings.AltairApiKey);
            });
        
        services.AddHttpClient(Constants.MercurioClientName,
            client =>
            {
                client.BaseAddress = new Uri(settings.MercurioBaseUrl);
                client.DefaultRequestHeaders.Add("x-api-key",settings.MercurioApiKey);
            });
        
        services.AddHttpClient(Constants.OrionClientName,
            client =>
            {
                client.BaseAddress = new Uri(settings.OrionBaseUrl);
                client.DefaultRequestHeaders.Add("x-api-key",settings.OrionApiKey);
            });
    }
    
    private static void ValidateSettings(ProviderSetting settings)
    {
        if (settings == null)
            throw new ArgumentNullException(nameof(settings), "Provider settings cannot be null.");
        
        ArgumentException.ThrowIfNullOrWhiteSpace(settings.AltairBaseUrl);
        // ArgumentException.ThrowIfNullOrWhiteSpace(settings.MercurioBaseUrl);
        ArgumentException.ThrowIfNullOrWhiteSpace(settings.OrionBaseUrl);
        
        ArgumentException.ThrowIfNullOrWhiteSpace(settings.AltairApiKey);
        // ArgumentException.ThrowIfNullOrWhiteSpace(settings.MercurioApiKey);
        ArgumentException.ThrowIfNullOrWhiteSpace(settings.OrionApiKey);
    }
}