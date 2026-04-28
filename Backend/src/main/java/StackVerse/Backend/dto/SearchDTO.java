package StackVerse.Backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class SearchDTO {
    private String location;
    
    @Min(value = 1000, message = "Minimum price must be at least 1000")
    private Double minPrice;
    
    @Min(value = 2000, message = "Maximum price must be at least 2000")
    private Double maxPrice;
    
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 10, message = "Rating must not exceed 10")
    private Double minRating;
    
    private String amenities;
}
