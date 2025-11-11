namespace Gateway.Application.Common.Interfaces;

internal interface IProvider
{
    Task<decimal> GetRateAsync(string fromCurrency, string toCurrency, double amount);
}