package mercuriofx.org.acme.data;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import mercuriofx.org.acme.model.Rate;

@ApplicationScoped
public class RateData {
    private Map<String, Rate> rateMap;

    @PostConstruct
    void init() {
        this.rateMap = loadRates();
    }

    public Rate getRate(String key) {
        return rateMap.get(key.toUpperCase());
    }

    private static Map<String, Rate> loadRates() {
        final var MAPPER = new ObjectMapper();

        try (InputStream inputStream = RateData.class.getResourceAsStream("/rates.json")) {

            if (inputStream == null) {
                throw new IllegalStateException("rates.json not found in classpath");
            }

            List<Rate> rates = MAPPER.readValue(inputStream, new TypeReference<List<Rate>>() {});
            
            return rates.stream().collect(
                Collectors.toMap(
                    rate -> rate.getFrom().toUpperCase() + "-" + rate.getTo().toUpperCase(),
                    rate -> rate,
                    (existing, replacement) -> existing.getRate() >= replacement.getRate() ? existing : replacement
                )
            );
        } catch (IOException e) {
            throw new RuntimeException("Failed to load rates.json", e);
        }
    }
}
