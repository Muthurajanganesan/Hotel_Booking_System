package StackVerse.Backend.service;

import StackVerse.Backend.dto.HotelDTO;
import java.util.List;

public interface HotelService {
    HotelDTO createHotel(HotelDTO hotelDTO);
    HotelDTO updateHotel(Long id, HotelDTO hotelDTO);
    HotelDTO getHotelById(Long id);
    List<HotelDTO> getAllHotels();
    List<HotelDTO> getHotelsByManager(Long managerId);
    void deleteHotel(Long id);
}
