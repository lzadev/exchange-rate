package mercuriofx.org.acme;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import mercuriofx.org.acme.dto.ExchangeRequest;
import mercuriofx.org.acme.service.ExchangeService;

@Path("/exchanges")
public class ExchangeResource {

    @Inject
    ExchangeService exchangeService;

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    public Response convert(@Valid ExchangeRequest request) {
        final var response = exchangeService.getExchangeRate(request);
        return Response.ok(response).build();
    }
}