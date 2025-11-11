using System.Text.Json.Serialization;

namespace Gateway.Infrastructure.Models;

internal class AltairProviderResponse
{
    [JsonPropertyName("statusCode")] public int StatusCode { get; set; }

    [JsonPropertyName("data")] public AltairData Data { get; set; }

    [JsonPropertyName("message")] public string Message { get; set; }
}

internal class AltairData
{
    [JsonPropertyName("total")] public decimal Total { get; set; }
}