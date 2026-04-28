package StackVerse.Backend.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long bookingId;

    @NotNull(message = "Room ID is required")
    private Long roomId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Check-in date is required")
    private LocalDateTime checkinDate;

    @NotNull(message = "Check-out date is required")
    private LocalDateTime checkoutDate;

    private LocalDateTime bookingDate;
    private String status;
    private BigDecimal totalAmount;
    private BigDecimal fine;
}
