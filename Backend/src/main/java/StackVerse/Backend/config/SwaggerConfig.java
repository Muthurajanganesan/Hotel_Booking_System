package StackVerse.Backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI hotelBookingOpenAPI() {
        Server localServer = new Server();
        localServer.setUrl("http://localhost:8080");
        localServer.setDescription("Local Development Server");

        Contact contact = new Contact();
        contact.setName("Hotel Booking Team");
        contact.setEmail("support@hotelbooking.com");

        Info info = new Info()
                .title("Hotel Booking System API")
                .version("1.0.0")
                .description("REST API for managing hotel room bookings and Stripe payments")
                .contact(contact)
                .license(new License().name("MIT License"));

        return new OpenAPI()
                .info(info)
                .servers(List.of(localServer));
    }
}
