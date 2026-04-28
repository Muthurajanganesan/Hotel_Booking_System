package StackVerse.Backend.dto;

import StackVerse.Backend.entity.Hotel.Status;
import lombok.Data;

@Data
public class HotelDTO {
    private Long hotelId;
    private String name;
    private String location;
    private String description;
    private String imageUrl;
    private Status status;
    private String managerName;
}
