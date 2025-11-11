using Gateway.Application.Exchanges.Dto;

namespace Gateway.Application.Exchanges.Interfaces;

public interface IExchangeService
{
    Task<ExchangeResponse> GetExchangeAsync(ExchangeQuery query);
}