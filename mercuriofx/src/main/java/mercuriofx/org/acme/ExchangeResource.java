package mercuriofx.org.acme;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeIn;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.ExampleObject;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import mercuriofx.org.acme.dto.ErrorResponse;
import mercuriofx.org.acme.dto.ExchangeRequest;
import mercuriofx.org.acme.dto.ExchangeResponse;
import mercuriofx.org.acme.service.ExchangeService;

@SecurityScheme(securitySchemeName = "api_key", type = SecuritySchemeType.APIKEY, apiKeyName = "x-api-key", in = SecuritySchemeIn.HEADER)
@Path("/exchanges")
@SecurityRequirement(name = "api_key")
public class ExchangeResource {

    @Inject
    ExchangeService exchangeService;

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    @Operation(summary = "Convert currencies", description = "Get the exchange rate between two currencies and convert the specified amount.")
    @APIResponse(responseCode = "200", description = "Successful currency conversion", content = @Content(mediaType = MediaType.APPLICATION_XML, schema = @Schema(implementation = ExchangeResponse.class), examples = @ExampleObject(name = "Example Response", value = "<XML><Total>92.0</Total></XML>")))
    @APIResponse(responseCode = "400", description = "Invalid request data", content = @Content(mediaType = MediaType.APPLICATION_XML, schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject(value = "<XML><Message>Invalid request data</Message></XML>")))
    @APIResponse(responseCode = "401", description = "Unauthorized (missing or invalid API key)", content = @Content(mediaType = MediaType.APPLICATION_XML, schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject(value = "<XML><Message>Invalid or missing API key</Message></XML>")))
    @APIResponse(responseCode = "404", description = "Currency pair not found", content = @Content(mediaType = MediaType.APPLICATION_XML, schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject(value = "<XML><Message>Exchange rate not found</Message></XML>")))
    public Response getExchangeRate(
            @Valid ExchangeRequest request) {
        final var response = exchangeService.getExchangeRate(request);
        return Response.ok(response).build();
    }
}
