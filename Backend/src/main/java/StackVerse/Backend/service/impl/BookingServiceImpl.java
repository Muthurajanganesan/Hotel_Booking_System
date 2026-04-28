package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.BookingDTO;
import StackVerse.Backend.entity.Booking;
import StackVerse.Backend.repository.BookingRepository;
import StackVerse.Backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        // Availability Check
        List<Booking> overlaps = bookingRepository.findOverlappingBookings(
                bookingDTO.getRoomId(), 
                bookingDTO.getCheckinDate(), 
                bookingDTO.getCheckoutDate()
        );
        
        if (!overlaps.isEmpty()) {
            throw new RuntimeException("Room is not available for the selected dates.");
        }

        Booking booking = new Booking();
        booking.setUserId(bookingDTO.getUserId());
        booking.setRoomId(bookingDTO.getRoomId());
        booking.setCheckinDate(bookingDTO.getCheckinDate());
        booking.setCheckoutDate(bookingDTO.getCheckoutDate());
        booking.setBookingDate(LocalDateTime.now());
        booking.setTotalAmount(bookingDTO.getTotalAmount());
        booking.setStatus(Booking.BookingStatus.BOOKED);
        
        Booking savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }

    @Override
    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return mapToDTO(booking);
    }

    @Override
    public List<BookingDTO> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelBooking(Long id, Long userId) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized: You can only cancel your own bookings.");
        }

        LocalDateTime now = LocalDateTime.now();
        BigDecimal refundAmount = BigDecimal.ZERO;
        BigDecimal fine = BigDecimal.ZERO;

        // Same day cancellation
        if (ChronoUnit.DAYS.between(booking.getBookingDate(), now) == 0) {
            refundAmount = booking.getTotalAmount();
            fine = BigDecimal.ZERO;
        } 
        // After check-in
        else if (now.isAfter(booking.getCheckinDate())) {
            long totalDays = ChronoUnit.DAYS.between(booking.getCheckinDate(), booking.getCheckoutDate());
            long remainingDays = ChronoUnit.DAYS.between(now, booking.getCheckoutDate());
            if (remainingDays > 0) {
                BigDecimal perDayAmount = booking.getTotalAmount().divide(BigDecimal.valueOf(totalDays), 2, BigDecimal.ROUND_HALF_UP);
                refundAmount = perDayAmount.multiply(BigDecimal.valueOf(remainingDays)).multiply(new BigDecimal("0.7"));
                fine = perDayAmount.multiply(BigDecimal.valueOf(remainingDays)).multiply(new BigDecimal("0.3"));
            }
        }
        // After one day but before check-in
        else {
            refundAmount = booking.getTotalAmount().multiply(new BigDecimal("0.7"));
            fine = booking.getTotalAmount().multiply(new BigDecimal("0.3"));
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking.setFine(fine);
        bookingRepository.save(booking);
        
        // In a real app, you would initiate Stripe refund here
    }

    @Override
    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO, Long userId) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized: You can only update your own bookings.");
        }

        // Check availability for new dates excluding current booking
        List<Booking> overlaps = bookingRepository.findOverlappingBookings(
                booking.getRoomId(), 
                bookingDTO.getCheckinDate(), 
                bookingDTO.getCheckoutDate()
        ).stream()
         .filter(b -> !b.getBookingId().equals(id))
         .collect(Collectors.toList());

        if (!overlaps.isEmpty()) {
            throw new RuntimeException("Room is not available for the selected new dates.");
        }

        booking.setCheckinDate(bookingDTO.getCheckinDate());
        booking.setCheckoutDate(bookingDTO.getCheckoutDate());
        booking.setTotalAmount(bookingDTO.getTotalAmount());
        
        return mapToDTO(bookingRepository.save(booking));
    }

    private BookingDTO mapToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setUserId(booking.getUserId());
        dto.setRoomId(booking.getRoomId());
        dto.setCheckinDate(booking.getCheckinDate());
        dto.setCheckoutDate(booking.getCheckoutDate());
        dto.setBookingDate(booking.getBookingDate());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus().name());
        dto.setFine(booking.getFine());
        return dto;
    }
}
