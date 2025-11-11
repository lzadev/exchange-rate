using Gateway.Application.Exchanges;
using Gateway.Application.Exchanges.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Gateway.Application;

public static class Extension
{
    public static void AddApplication(this WebApplicationBuilder builder)
    {
        var services = builder.Services;

        services.AddScoped<IExchangeService, ExchangeService>();
    }
}