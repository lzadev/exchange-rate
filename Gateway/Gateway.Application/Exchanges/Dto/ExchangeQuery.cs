namespace Gateway.Application.Exchanges.Dto;

public record ExchangeQuery(string From, string To, decimal Amount);