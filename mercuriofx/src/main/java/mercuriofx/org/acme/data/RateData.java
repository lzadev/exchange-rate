package mercuriofx.org.acme.data;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.jboss.logging.Logger;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import mercuriofx.org.acme.model.Rate;

@ApplicationScoped
public class RateData {

    private static final Logger LOG = Logger.getLogger(RateData.class);
    private Map<String, Rate> rateMap;

    @PostConstruct
    void init() {
        LOG.info("Initializing rate data");
        this.rateMap = loadRates();
        LOG.infof("Loaded exchange rates successfully");
    }

    public Rate getRate(String key) {
        return rateMap.get(key.toUpperCase());
    }

    private static Map<String, Rate> loadRates() {
        final var MAPPER = new ObjectMapper();

        try (InputStream inputStream = RateData.class.getResourceAsStream("/rates.json")) {

            if (inputStream == null) {
                LOG.error("rates.json not found in classpath");
                throw new IllegalStateException("rates.json not found in classpath");
            }

            List<Rate> rates = MAPPER.readValue(inputStream, new TypeReference<List<Rate>>() {
            });
            LOG.infof("Loaded exchange rates from rates.json");

            return rates.stream().collect(
                    Collectors.toMap(
                            rate -> rate.getFrom().toUpperCase() + "-" + rate.getTo().toUpperCase(),
                            rate -> rate,
                            (existing, replacement) -> existing.getRate() >= replacement.getRate() ? existing : replacement
                    )
            );
        } catch (IOException e) {
            LOG.error("Failed to load rates.json", e);
            throw new RuntimeException("Failed to load rates.json", e);
        }
    }
}
