using System.Text.Json.Serialization;

namespace Gateway.Infrastructure.Models;

internal class OrionProviderResponse
{
    [JsonPropertyName("rate")]
    public decimal Rate { get; set; }
}