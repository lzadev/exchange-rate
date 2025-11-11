namespace Gateway.Application.Common.Exceptions;

public class BadRequestException(string message) : Exception(message);