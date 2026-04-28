package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.RoomDTO;
import StackVerse.Backend.entity.Hotel;
import StackVerse.Backend.entity.Room;
import StackVerse.Backend.repository.HotelRepository;
import StackVerse.Backend.repository.RoomRepository;
import StackVerse.Backend.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    @Override
    public RoomDTO addRoom(RoomDTO roomDTO) {
        Hotel hotel = hotelRepository.findById(roomDTO.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        
        Room room = mapToEntity(roomDTO);
        room.setHotel(hotel);
        Room savedRoom = roomRepository.save(room);
        return mapToDTO(savedRoom);
    }

    @Override
    public RoomDTO updateRoom(Long id, RoomDTO roomDTO) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        
        room.setPrice(roomDTO.getPrice());
        room.setAmenities(roomDTO.getAmenities());
        room.setRating(roomDTO.getRating());
        room.setAvailability(roomDTO.getAvailability());
        
        Room updatedRoom = roomRepository.save(room);
        return mapToDTO(updatedRoom);
    }

    @Override
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return mapToDTO(room);
    }

    @Override
    public List<RoomDTO> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelHotelId(hotelId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    private RoomDTO mapToDTO(Room room) {
        return new RoomDTO(
                room.getRoomId(),
                room.getHotel().getHotelId(),
                room.getPrice(),
                room.getAmenities(),
                room.getRating(),
                room.getAvailability()
        );
    }

    private Room mapToEntity(RoomDTO dto) {
        Room room = new Room();
        room.setPrice(dto.getPrice());
        room.setAmenities(dto.getAmenities());
        room.setRating(dto.getRating());
        room.setAvailability(dto.getAvailability() != null ? dto.getAvailability() : true);
        return room;
    }
}
