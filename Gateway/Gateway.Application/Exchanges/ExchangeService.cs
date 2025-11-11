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
        Validate(query);
        
        var result = await Task.WhenAll(exchangeProviders.Select(x=>
            x.GetRateAsync(query.From, query.To, query.Amount)).ToArray());
        
        var validResults = result.Where(x => x > 0)
            .OrderByDescending(x => x)
            .ToArray();

        return validResults.Length == 0 ? throw new NotResultException("No exchange rates available from providers") 
            : new ExchangeResponse(validResults[0]);
    }
    
    private static void Validate(ExchangeQuery query)
    {
        if (string.IsNullOrWhiteSpace(query.From))
            throw new BadRequestException("From currency is required.");
        
        if (string.IsNullOrWhiteSpace(query.To))
            throw new BadRequestException("To currency is required.");
        
        if (query.Amount <= 0)
            throw new BadRequestException("Amount must be greater than zero.");
        
        if(query.From.ToUpper() == query.To.ToUpper())
            throw new BadRequestException("From and To currencies must be different.");
    }
}