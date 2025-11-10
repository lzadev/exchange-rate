package mercuriofx.org.acme.mapper;

import java.util.stream.Collectors;

import org.jboss.logging.Logger;

import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import mercuriofx.org.acme.dto.ErrorResponse;

@Provider
public class ValidationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {
    
    private static final Logger LOG = Logger.getLogger(ValidationExceptionMapper.class);
    @Override
    public Response toResponse(ConstraintViolationException e) {
        String msg = e.getConstraintViolations()
                .stream()
                .map(v -> v.getMessage())
                .collect(Collectors.joining(", "));
                
        LOG.error("ValidationException: " + msg, e);
        
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(new ErrorResponse(msg))
                .type(MediaType.APPLICATION_XML)
                .build();
    }
}
