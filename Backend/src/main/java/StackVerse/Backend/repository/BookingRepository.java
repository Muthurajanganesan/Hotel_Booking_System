package StackVerse.Backend.repository;

import StackVerse.Backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(Booking.Status status);
    List<Booking> findByUserId(Long userId);

    @Query("SELECT b FROM Booking b WHERE b.roomId = :roomId AND b.status != 'CANCELLED' " +
           "AND ((:checkin >= b.checkinDate AND :checkin < b.checkoutDate) " +
           "OR (:checkout > b.checkinDate AND :checkout <= b.checkoutDate) " +
           "OR (b.checkinDate >= :checkin AND b.checkinDate < :checkout))")
    List<Booking> findOverlappingBookings(@Param("roomId") Long roomId, 
                                         @Param("checkin") LocalDateTime checkin, 
                                         @Param("checkout") LocalDateTime checkout);
}
