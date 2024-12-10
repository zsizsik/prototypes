package org.agoncal.quarkus.starting;

import io.quarkus.security.Authenticated;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;
import java.util.Optional;

@Path("/api/books")
@Produces(MediaType.APPLICATION_JSON)
public class BookResource {

    public record Book(int isbn, String title, String author) {
    }

    List<Book> library = List.of(
            new Book(1, "HP 1", "kathrine "),
            new Book(2, "HP 2", "kathrine "),
            new Book(3, "HP 3", "kathrine ")
    );

    @GET
    @Path("/count")
    @Produces(MediaType.TEXT_PLAIN)
    @Authenticated
    public int count() {
        return library.size();
    }

    @GET
    public List<Book> getAllBooks() {
        return library;
    }

    @GET
    @Path("/{id}")
    public Optional<Book> getBook(@PathParam("id") int id) {
        return library.stream().filter(b -> b.isbn() == id).findFirst();
    }

}


