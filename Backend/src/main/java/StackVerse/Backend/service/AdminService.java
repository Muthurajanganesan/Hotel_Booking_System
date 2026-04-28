package StackVerse.Backend.service;

import StackVerse.Backend.dto.HotelDTO;
import java.util.List;

public interface AdminService {
    List<HotelDTO> getPendingHotelRequests();
    void approveHotel(Long hotelId);
    void rejectHotel(Long hotelId);
    void deleteHotel(Long hotelId);
}
