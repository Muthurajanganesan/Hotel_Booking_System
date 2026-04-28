package StackVerse.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "Payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @Column(name = "booking_id")
    private Long bookingId; // Assuming Booking relationship or just ID

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    public enum PaymentStatus {
        PENDING, PAID, FAILED
    }
}
