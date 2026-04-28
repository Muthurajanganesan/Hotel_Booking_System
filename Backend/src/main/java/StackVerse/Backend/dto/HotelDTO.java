package StackVerse.Backend.dto;

import StackVerse.Backend.entity.Hotel.Status;
import lombok.Data;

@Data
public class HotelDTO {
    private Long hotelId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelDTO {
    private Long hotelId;
    private Long managerId;
    private String name;
    private String location;
    private String description;
    private String imageUrl;
    private Status status;
    private String managerName;
    private String status; // PENDING, APPROVED, REJECTED
}
