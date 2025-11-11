using System.Text.Json;
using Gateway.Application.Common.Interfaces;
using Gateway.Infrastructure.Models;
using Microsoft.Extensions.Logging;

namespace Gateway.Infrastructure.Providers;

internal class OrionProvider(
    ILogger<OrionProvider> logger,
    IHttpClientFactory clientFactory) : IProvider
{
    public async Task<decimal> GetRateAsync(string fromCurrency, string toCurrency, double amount)
    {
        try
        {
            var client = clientFactory.CreateClient(Constants.OrionClientName);

            var uriBuilder = new UriBuilder(client.BaseAddress + "exchanges");
            var queryParams = $"from={fromCurrency}&to={toCurrency}&value={amount}";
            uriBuilder.Query = queryParams;

            var httpResponse = await client.GetAsync(uriBuilder.Uri);

            if (!httpResponse.IsSuccessStatusCode)
            {
                logger.LogError("Failed to fetch rate from Orion Exchange Provider: {StatusCode}", httpResponse.StatusCode);
                return decimal.Zero;
            }

            var response = JsonSerializer.Deserialize<OrionProviderResponse>(
                await httpResponse.Content.ReadAsStringAsync());

            if (response != null) return response.Rate;
            
            logger.LogError("Received null response from Orion Exchange Provider");
            return decimal.Zero;

        }
        catch (Exception ex)
        {
            logger.LogError(ex,"Error while fetching rate from Orion Exchange Provider");
            return decimal.Zero;
        }
    }
}