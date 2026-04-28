package StackVerse.Backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class PaymentDTO {
    private Long paymentId;
    private Long bookingId;
    private BigDecimal amount;
    private String status;
}
