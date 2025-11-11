using System.Net.Http.Headers;
using System.Text;
using System.Xml;
using System.Xml.Serialization;
using Gateway.Application.Common.Interfaces;
using Gateway.Infrastructure.Models;
using Microsoft.Extensions.Logging;

namespace Gateway.Infrastructure.Providers;

internal class MercurioProvider(
    IHttpClientFactory clientFactory,
    ILogger<MercurioProvider> logger) : IProvider
{
    public async Task<decimal> GetRateAsync(string fromCurrency, string toCurrency, decimal amount)
    {
        try
        {
            var client = clientFactory.CreateClient(Constants.MercurioClientName);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
            
            var request = new MercurioProviderRequest
            {
                From = fromCurrency,
                To = toCurrency,
                Amount = amount
            };

            var xmlBody = SerializeToXml(request);
            var content = new StringContent(xmlBody, Encoding.UTF8, "application/xml");

            var httpResponse = await client.PostAsync("exchanges", content);
            var body = await httpResponse.Content.ReadAsStringAsync();

            if (!httpResponse.IsSuccessStatusCode)
            {
                logger.LogError("Failed to fetch rate from Mercurio Exchange Provider: {StatusCode}", httpResponse.StatusCode);
                return decimal.Zero;
            }

            var serializer = new XmlSerializer(typeof(MercurioProviderResponse));
            using var reader = new StringReader(body);
            var result = (MercurioProviderResponse?)serializer.Deserialize(reader);

            return result != null ? (decimal)result.Total : decimal.Zero;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error while fetching rate from Mercurio Exchange Provider");
            return decimal.Zero;
        }
    }
    
    private static string SerializeToXml<T>(T obj)
    {
        var xmlSerializer = new XmlSerializer(typeof(T));
        var emptyNs = new XmlSerializerNamespaces();
        emptyNs.Add("", "");

        var settings = new XmlWriterSettings
        {
            OmitXmlDeclaration = true,
            Encoding = new UTF8Encoding(false),
            Indent = false
        };

        using var stringWriter = new StringWriter();
        using (var xmlWriter = XmlWriter.Create(stringWriter, settings))
        {
            xmlSerializer.Serialize(xmlWriter, obj, emptyNs);
        }

        return stringWriter.ToString();
    }

}