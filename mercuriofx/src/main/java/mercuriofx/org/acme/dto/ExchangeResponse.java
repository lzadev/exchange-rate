package mercuriofx.org.acme.dto;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "XML")
@XmlAccessorType(XmlAccessType.FIELD)
public class ExchangeResponse {

    @XmlElement(name = "Total")
    private Double result;

    public ExchangeResponse() {
    }

    public ExchangeResponse(Double result) {
        this.result = result;
    }

    public Double getResult() {
        return result;
    }

    public void setResult(Double result) {
        this.result = result;
    }
}
