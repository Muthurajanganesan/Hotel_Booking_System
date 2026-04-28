package StackVerse.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Long roomId;
    private Long hotelId;
    private BigDecimal price;
    private String amenities;
    private Double rating;
    private Boolean availability;
}
