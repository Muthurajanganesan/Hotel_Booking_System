package StackVerse.Backend.service;

import StackVerse.Backend.dto.RoomDTO;
import java.util.List;

public interface RoomService {
    RoomDTO addRoom(RoomDTO roomDTO);
    RoomDTO updateRoom(Long id, RoomDTO roomDTO);
    RoomDTO getRoomById(Long id);
    List<RoomDTO> getRoomsByHotel(Long hotelId);
    void deleteRoom(Long id);
}
