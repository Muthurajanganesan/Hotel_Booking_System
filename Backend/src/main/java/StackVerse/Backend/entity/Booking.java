package StackVerse.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Stub relationship to Room. Since you only need revenue/status for analytics
    // and might not even need the Room entity fully yet, we'll avoid the mapping 
    // or just assume there's a Room entity that will be added later. We'll add 
    // a basic stub for Room below if needed, or just store roomId for now.
    @Column(name = "room_id")
    private Long roomId;

    private LocalDateTime checkinDate;
    private LocalDateTime checkoutDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    private BigDecimal fine = BigDecimal.ZERO;

    // Note: Assuming payment or room price is available for calculating revenue.
    // Realistically, the "totalAmount" logic is either in Payment or computed from Room price. 
    // We'll add a transient field or simple column for testing analytics.
    private BigDecimal totalAmount; 

    public enum Status {
        BOOKED, CANCELLED, COMPLETED
    }
}
