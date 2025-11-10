package mercuriofx.org.acme.mapper;
import org.jboss.logging.Logger;

import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import mercuriofx.org.acme.dto.ErrorResponse;

@Provider
public class BadRequestExceptionMapper implements ExceptionMapper<BadRequestException> {
    private static final Logger LOG = Logger.getLogger(BadRequestExceptionMapper.class);
    @Override
    public Response toResponse(BadRequestException exception) {
        LOG.error("BadRequestException: " + exception.getMessage(), exception);
        ErrorResponse error = new ErrorResponse(exception.getMessage());

        return Response.status(Response.Status.BAD_REQUEST  )
                .entity(error)
                .type(MediaType.APPLICATION_XML)
                .build();
    }
}