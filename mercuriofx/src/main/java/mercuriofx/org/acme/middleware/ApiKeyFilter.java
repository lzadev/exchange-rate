package mercuriofx.org.acme.middleware;

import java.io.IOException;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import mercuriofx.org.acme.dto.ErrorResponse;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class ApiKeyFilter implements ContainerRequestFilter {

    @ConfigProperty(name = "API_KEY")
    String apiKey;

    private static final Logger LOG = Logger.getLogger(ApiKeyFilter.class);

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        final var providedApiKey = requestContext.getHeaderString("x-api-key");

        if (apiKey == null || !apiKey.equals(providedApiKey)) {
            LOG.warnf("Unauthorized access attempt with API key: %s", providedApiKey);

            final var errorResponse = new ErrorResponse("Invalid or missing API key");

            requestContext.abortWith(
                    Response.status(Response.Status.UNAUTHORIZED)
                            .entity(errorResponse)
                            .type(MediaType.APPLICATION_XML)
                            .build());
        }

        LOG.infof("Authorized request");
    }
}
