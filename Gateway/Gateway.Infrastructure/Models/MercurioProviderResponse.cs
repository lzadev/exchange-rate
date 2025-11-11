using System.Xml.Serialization;

namespace Gateway.Infrastructure.Models;

[XmlRoot("XML")]
public class MercurioProviderResponse
{
    [XmlElement("Total")] public double Total { get; set; }
}