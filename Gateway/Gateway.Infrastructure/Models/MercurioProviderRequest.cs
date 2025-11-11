using System.Xml.Serialization;

namespace Gateway.Infrastructure.Models;

[XmlRoot("XML")]
public class MercurioProviderRequest
{
    [XmlElement("From")]
    public string From { get; set; }

    [XmlElement("To")]
    public string To { get; set; }

    [XmlElement("Amount")]
    public decimal Amount { get; set; }
}