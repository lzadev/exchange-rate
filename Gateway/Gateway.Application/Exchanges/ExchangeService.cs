using Gateway.Application.Common.Exceptions;
using Gateway.Application.Common.Interfaces;
using Gateway.Application.Exchanges.Dto;
using Gateway.Application.Exchanges.Interfaces;

namespace Gateway.Application.Exchanges;

internal class ExchangeService(
    IEnumerable<IProvider> exchangeProviders) : IExchangeService
{
    public async Task<ExchangeResponse> GetExchangeAsync(ExchangeQuery query)
    {
        var result = await Task.WhenAll(exchangeProviders.Select(x=>
            x.GetRateAsync(query.From, query.To, query.Amount)).ToArray());
        
        var validResults = result.Where(x => x > 0)
            .OrderByDescending(x => x)
            .ToArray();

        return validResults.Length == 0 ? throw new NotResultException("No exchange rates available from providers") 
            : new ExchangeResponse(validResults[0]);
    }
}