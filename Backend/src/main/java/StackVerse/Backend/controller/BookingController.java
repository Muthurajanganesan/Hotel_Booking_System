package StackVerse.Backend.controller;

import StackVerse.Backend.dto.BookingDTO;
import StackVerse.Backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(bookingService.createBooking(bookingDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Long id, @RequestBody BookingDTO bookingDTO, @RequestParam Long userId) {
        return ResponseEntity.ok(bookingService.updateBooking(id, bookingDTO, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id, @RequestParam Long userId) {
        bookingService.cancelBooking(id, userId);
        return ResponseEntity.noContent().build();
    }
}
