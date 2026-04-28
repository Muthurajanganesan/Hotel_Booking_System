package StackVerse.Backend.service;

import StackVerse.Backend.dto.BookingDTO;
import java.util.List;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);
    BookingDTO getBookingById(Long id);
    List<BookingDTO> getBookingsByUserId(Long userId);
    void cancelBooking(Long id);
}
