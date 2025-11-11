using Gateway.Application.Exchanges;
using Gateway.Application.Exchanges.Dto;
using Gateway.Application.Common.Exceptions;
using Gateway.Application.Common.Interfaces;
using Moq;

namespace Gateway.Tests;

public class ExchangeServiceTests
{
    [Fact]
    public async Task GetExchangeAsync_ReturnsHighestValidRate()
    {
        var providerMock = new Mock<IProvider>();
        providerMock.Setup(p => p.GetRateAsync("USD", "EUR", 100m)).ReturnsAsync(92m);
        var service = new ExchangeService(new List<IProvider> { providerMock.Object });
        var query = new ExchangeQuery("USD", "EUR", 100m);

        var response = await service.GetExchangeAsync(query);

        Assert.Equal(92m, response.Total);
    }

    [Fact]
    public async Task GetExchangeAsync_ThrowsNotResultException_WhenNoRates()
    {
        var providerMock = new Mock<IProvider>();
        providerMock.Setup(p => p.GetRateAsync("USD", "EUR", 100m)).ReturnsAsync(0m);
        var service = new ExchangeService(new List<IProvider> { providerMock.Object });
        var query = new ExchangeQuery("USD", "EUR", 100m);

        await Assert.ThrowsAsync<NotResultException>(() => service.GetExchangeAsync(query));
    }

    [Theory]
    [InlineData(null, "EUR", 100)]
    [InlineData("USD", null, 100)]
    [InlineData("", "EUR", 100)]
    [InlineData("USD", "", 100)]
    [InlineData("USD", "USD", 100)]
    [InlineData("USD", "EUR", 0)]
    [InlineData("USD", "EUR", -1)]
    public async Task GetExchangeAsync_ThrowsBadRequestException_ForInvalidQuery(string from, string to, decimal amount)
    {
        var providerMock = new Mock<IProvider>();
        var service = new ExchangeService(new List<IProvider> { providerMock.Object });
        var query = new ExchangeQuery(from, to, amount);

        await Assert.ThrowsAsync<BadRequestException>(() => service.GetExchangeAsync(query));
    }

    [Fact]
    public async Task GetExchangeAsync_ReturnsHighestRate_FromMultipleProviders()
    {
        var providerMock1 = new Mock<IProvider>();
        var providerMock2 = new Mock<IProvider>();
        providerMock1.Setup(p => p.GetRateAsync("USD", "EUR", 100m)).ReturnsAsync(90m);
        providerMock2.Setup(p => p.GetRateAsync("USD", "EUR", 100m)).ReturnsAsync(95m);
        var service = new ExchangeService(new List<IProvider> { providerMock1.Object, providerMock2.Object });
        var query = new ExchangeQuery("USD", "EUR", 100m);

        var response = await service.GetExchangeAsync(query);

        Assert.Equal(95m, response.Total);
    }
}