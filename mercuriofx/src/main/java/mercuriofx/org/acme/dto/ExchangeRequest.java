package mercuriofx.org.acme.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "XML")
@XmlAccessorType(XmlAccessType.FIELD)
public class ExchangeRequest {

    @NotBlank(message = "From currency must not be empty")
    @XmlElement(name = "From")
    private String from;

    @NotBlank(message = "To currency must not be empty")
    @XmlElement(name = "To")
    private String to;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    @XmlElement(name = "Amount")
    private Double amount;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "ExchangeRequest from=" + from + ", to=" + to + ", amount=" + amount + "";
    }
}
