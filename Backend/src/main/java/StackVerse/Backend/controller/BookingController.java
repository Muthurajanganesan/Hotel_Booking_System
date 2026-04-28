package StackVerse.Backend.controller;

import StackVerse.Backend.dto.BookingDTO;
import StackVerse.Backend.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
@Tag(name = "Booking Management", description = "APIs for creating, updating, viewing and cancelling hotel bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Operation(summary = "Create a new booking", description = "Books a hotel room for the specified dates. Validates room availability before confirming.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Booking created successfully"),
        @ApiResponse(responseCode = "400", description = "Room not available for the selected dates")
    })
    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(bookingService.createBooking(bookingDTO));
    }

    @Operation(summary = "Get booking by ID", description = "Retrieves a single booking by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Booking found"),
        @ApiResponse(responseCode = "404", description = "Booking not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(
            @Parameter(description = "Booking ID") @PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @Operation(summary = "Get all bookings for a user", description = "Returns all bookings associated with the given user ID.")
    @ApiResponse(responseCode = "200", description = "List of bookings returned")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByUserId(
            @Parameter(description = "User ID") @PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }

    @Operation(summary = "Update booking dates", description = "Updates the check-in and check-out dates of an existing booking. Validates for date overlaps.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Booking updated successfully"),
        @ApiResponse(responseCode = "400", description = "Dates overlap with another booking or user mismatch")
    })
    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(
            @Parameter(description = "Booking ID") @PathVariable Long id,
            @RequestBody BookingDTO bookingDTO,
            @Parameter(description = "User ID for ownership verification") @RequestParam Long userId) {
        return ResponseEntity.ok(bookingService.updateBooking(id, bookingDTO, userId));
    }

    @Operation(summary = "Cancel a booking", description = "Cancels an existing booking. Applies refund policy: 100% same-day, 70% after 1 day or post check-in.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Booking cancelled successfully"),
        @ApiResponse(responseCode = "403", description = "User not authorized to cancel this booking"),
        @ApiResponse(responseCode = "404", description = "Booking not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(
            @Parameter(description = "Booking ID") @PathVariable Long id,
            @Parameter(description = "User ID for ownership verification") @RequestParam Long userId) {
        bookingService.cancelBooking(id, userId);
        return ResponseEntity.noContent().build();
    }
}
