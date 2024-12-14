package org.agoncal.quarkus.starting;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api")
@Produces(MediaType.TEXT_PLAIN)
public class BookResource {

    @GET
    @Path("/public")
    public String publicEndpoint() {
        return "This endpoint is public.";
    }

    @GET
    @Path("/protected")
    @Authenticated
    public String protectedEndpoint() {
        return "This endpoint is only available for authenticated users.";
    }

    @GET
    @Path("/protected/admin")
    @RolesAllowed("web-edit")
    public String adminEndpoint() {
        return "This endpoint is only available for authenticated users having admin role.";
    }

}


