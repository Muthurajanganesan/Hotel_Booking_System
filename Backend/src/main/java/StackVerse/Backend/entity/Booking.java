package StackVerse.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "user_id")
    private Long userId; // Assuming User entity is handled by another module

    @Column(name = "room_id")
    private Long roomId; // Assuming Room entity is handled by another module

    private LocalDateTime checkinDate;
    private LocalDateTime checkoutDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private BigDecimal fine = BigDecimal.ZERO;

    public enum BookingStatus {
        BOOKED, CANCELLED, COMPLETED
    }
}
