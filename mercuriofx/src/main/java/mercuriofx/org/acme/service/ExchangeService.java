package mercuriofx.org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;
import mercuriofx.org.acme.data.RateData;
import mercuriofx.org.acme.dto.ExchangeRequest;
import mercuriofx.org.acme.dto.ExchangeResponse;

@ApplicationScoped
public class ExchangeService {

    @Inject
    RateData rateData;

    public ExchangeResponse getExchangeRate(ExchangeRequest request) {

        final var rateValue = getRate(request);

        return new ExchangeResponse(rateValue * request.getAmount());
    }

    private double getRate(ExchangeRequest request) {
        final var key = request.getFrom() + "-" + request.getTo();

        final var result = rateData.getRate(key);

        if (result == null) {
            throw new NotFoundException("Exchange rate not found");
        }
        return result.getRate();
    }
}
