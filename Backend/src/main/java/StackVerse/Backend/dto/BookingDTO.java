package StackVerse.Backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class BookingDTO {
    private Long bookingId;
    private Long userId;
    private Long roomId;
    private LocalDateTime checkinDate;
    private LocalDateTime checkoutDate;
    private String status;
    private BigDecimal fine;
}
