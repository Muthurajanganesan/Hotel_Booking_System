package StackVerse.Backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class PromotionDTO {
    private Long promoId;
    private String code;
    private BigDecimal discount;
    private String description;
    private LocalDate validUntil;
}
