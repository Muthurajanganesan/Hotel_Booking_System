package StackVerse.Backend.controller;

import StackVerse.Backend.dto.PaymentDTO;
import StackVerse.Backend.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
@Tag(name = "Payment Management", description = "APIs for creating Stripe payment intents and retrieving payment details")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Operation(
        summary = "Create a Stripe PaymentIntent",
        description = "Initiates a payment for a booking by creating a Stripe PaymentIntent. Returns the clientSecret to confirm payment on the frontend."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "PaymentIntent created, clientSecret returned"),
        @ApiResponse(responseCode = "500", description = "Stripe API error")
    })
    @PostMapping
    public ResponseEntity<PaymentDTO> processPayment(@RequestBody PaymentDTO paymentDTO) {
        return ResponseEntity.ok(paymentService.processPayment(paymentDTO));
    }

    @Operation(summary = "Get payment by booking ID", description = "Retrieves the payment record associated with a specific booking.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Payment found"),
        @ApiResponse(responseCode = "404", description = "Payment not found for booking")
    })
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<PaymentDTO> getPaymentByBookingId(
            @Parameter(description = "Booking ID to retrieve payment for") @PathVariable Long bookingId) {
        return ResponseEntity.ok(paymentService.getPaymentByBookingId(bookingId));
    }
}
