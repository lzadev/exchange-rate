package mercuriofx.org.acme.mapper;
import org.jboss.logging.Logger;

import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import mercuriofx.org.acme.dto.ErrorResponse;

@Provider
public class NotFoundExceptionMapper implements ExceptionMapper<NotFoundException> {
    private static final Logger LOG = Logger.getLogger(NotFoundExceptionMapper.class);
    @Override
    public Response toResponse(NotFoundException exception) {
        LOG.error("NotFoundException: " + exception.getMessage(), exception);
        
        ErrorResponse error = new ErrorResponse(exception.getMessage());

        return Response.status(Response.Status.NOT_FOUND)
                .entity(error)
                .type(MediaType.APPLICATION_XML)
                .build();
    }
}