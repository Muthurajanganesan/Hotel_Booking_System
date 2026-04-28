package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.SearchDTO;
import StackVerse.Backend.entity.Hotel;
import StackVerse.Backend.entity.Room;
import StackVerse.Backend.repository.HotelRepository;
import StackVerse.Backend.repository.RoomRepository;
import StackVerse.Backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public List<Hotel> searchHotels(String location) {
        if (location == null || location.isEmpty()) {
            return hotelRepository.findAll();
        }
        return hotelRepository.findByLocationContainingIgnoreCase(location);
    }

    @Override
    public List<Room> searchRooms(SearchDTO searchDTO) {
        return roomRepository.searchRooms(
                searchDTO.getLocation(),
                searchDTO.getMinPrice(),
                searchDTO.getMaxPrice(),
                searchDTO.getMinRating(),
                searchDTO.getAmenities()
        );
    }

    @Override
    public List<Room> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    @Override
    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }
}
