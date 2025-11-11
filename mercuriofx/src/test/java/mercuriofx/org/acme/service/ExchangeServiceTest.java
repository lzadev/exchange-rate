package mercuriofx.org.acme.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import jakarta.ws.rs.NotFoundException;
import mercuriofx.org.acme.data.RateData;
import mercuriofx.org.acme.dto.ExchangeRequest;
import mercuriofx.org.acme.dto.ExchangeResponse;
import mercuriofx.org.acme.model.Rate;

public class ExchangeServiceTest {

    private ExchangeService service;
    private RateData rateData;

    @BeforeEach
    void setUp() {
        service = new ExchangeService();
        rateData = Mockito.mock(RateData.class);
        service.rateData = rateData;
    }

    @Test
    void testGetExchangeRate_validRequest_returnsResponse() {
        ExchangeRequest request = new ExchangeRequest();
        request.setFrom("USD");
        request.setTo("EUR");
        request.setAmount(100.0);
        Mockito.when(rateData.getRate("USD-EUR")).thenReturn(new Rate("USD", "EUR", 0.85));

        ExchangeResponse response = service.getExchangeRate(request);
        assertNotNull(response);
        assertEquals(85.0, response.getResult());
    }

    @Test
    void testGetExchangeRate_rateNotFound_throwsNotFoundException() {
        ExchangeRequest request = new ExchangeRequest();
        request.setFrom("USD");
        request.setTo("XXX");
        request.setAmount(100.0);
        Mockito.when(rateData.getRate("USD-XXX")).thenReturn(null);

        assertThrows(NotFoundException.class, () -> service.getExchangeRate(request));
    }

    @Test
    void testGetExchangeRate_zeroAmount_returnsZero() {
        ExchangeRequest request = new ExchangeRequest();
        request.setFrom("USD");
        request.setTo("EUR");
        request.setAmount(0.0);
        Mockito.when(rateData.getRate("USD-EUR")).thenReturn(new Rate("USD", "EUR", 0.85));

        ExchangeResponse response = service.getExchangeRate(request);
        assertEquals(0.0, response.getResult());
    }
}
