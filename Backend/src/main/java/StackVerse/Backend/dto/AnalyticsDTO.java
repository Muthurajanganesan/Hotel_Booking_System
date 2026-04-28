package StackVerse.Backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AnalyticsDTO {
    private BigDecimal revenue;
    private Double occupancyRate;
    private Long totalBookings;
    private String period;

    public AnalyticsDTO(BigDecimal revenue, Double occupancyRate, Long totalBookings, String period) {
        this.revenue = revenue;
        this.occupancyRate = occupancyRate;
        this.totalBookings = totalBookings;
        this.period = period;
    }
}
