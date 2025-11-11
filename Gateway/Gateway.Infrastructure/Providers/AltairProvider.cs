using System.Text.Json;
using Gateway.Application.Common.Interfaces;
using Gateway.Infrastructure.Models;
using Microsoft.Extensions.Logging;

namespace Gateway.Infrastructure.Providers;

internal class AltairProvider(
    IHttpClientFactory clientFactory,
    ILogger<AltairProvider> logger) : IProvider
{
    public async Task<decimal> GetRateAsync(string fromCurrency, string toCurrency, double amount)
    {
        try
        {
            var client = clientFactory.CreateClient(Constants.AltairClientName);

            var uriBuilder = new UriBuilder(client.BaseAddress + "exchanges");
            var queryParams = $"sourceCurrency={fromCurrency}&targetCurrency={toCurrency}&quantity={amount}";
            uriBuilder.Query = queryParams;

            var httpResponse = await client.GetAsync(uriBuilder.Uri);

            if (!httpResponse.IsSuccessStatusCode)
            {
                logger.LogError("Failed to fetch rate from Altair Exchange Provider : {StatusCode}", httpResponse.StatusCode);
                return decimal.Zero;
            }

            // var body = httpResponse.Content.ReadAsStringAsync();

            var response = JsonSerializer.Deserialize<AltairProviderResponse>(
                await httpResponse.Content.ReadAsStringAsync());

            if (response != null) return response.Data.Total;
            
            logger.LogError("Received null response from Altair Exchange Provider");
            return decimal.Zero;

        }
        catch (Exception ex)
        {
            logger.LogError(ex,"Error while fetching rate from Altair Exchange Provider");
            return decimal.Zero;
        }
    }
}