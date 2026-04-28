package StackVerse.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private Long paymentId;
    private Long bookingId;
    private BigDecimal amount;
    private String status;
    private String clientSecret;
}
