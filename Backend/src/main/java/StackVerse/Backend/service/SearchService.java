package StackVerse.Backend.service;

import StackVerse.Backend.dto.SearchDTO;
import StackVerse.Backend.entity.Hotel;
import StackVerse.Backend.entity.Room;
import java.util.List;

public interface SearchService {
    List<Hotel> searchHotels(String location);
    List<Room> searchRooms(SearchDTO searchDTO);
    List<Room> getRoomsByHotelId(Long hotelId);
    Room getRoomById(Long id);
}
