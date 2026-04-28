package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.HotelDTO;
import StackVerse.Backend.entity.Hotel;
import StackVerse.Backend.repository.HotelRepository;
import StackVerse.Backend.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;

    @Override
    public HotelDTO createHotel(HotelDTO hotelDTO) {
        Hotel hotel = mapToEntity(hotelDTO);
        hotel.setStatus(Hotel.Status.PENDING);
        Hotel savedHotel = hotelRepository.save(hotel);
        return mapToDTO(savedHotel);
    }

    @Override
    public HotelDTO updateHotel(Long id, HotelDTO hotelDTO) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        
        hotel.setName(hotelDTO.getName());
        hotel.setLocation(hotelDTO.getLocation());
        hotel.setDescription(hotelDTO.getDescription());
        hotel.setImageUrl(hotelDTO.getImageUrl());
        
        Hotel updatedHotel = hotelRepository.save(hotel);
        return mapToDTO(updatedHotel);
    }

    @Override
    public HotelDTO getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        return mapToDTO(hotel);
    }

    @Override
    public List<HotelDTO> getAllHotels() {
        return hotelRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<HotelDTO> getHotelsByManager(Long managerId) {
        return hotelRepository.findByManagerId(managerId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }

    private HotelDTO mapToDTO(Hotel hotel) {
        return new HotelDTO(
                hotel.getHotelId(),
                hotel.getManagerId(),
                hotel.getName(),
                hotel.getLocation(),
                hotel.getDescription(),
                hotel.getImageUrl(),
                hotel.getStatus().name()
        );
    }

    private Hotel mapToEntity(HotelDTO dto) {
        Hotel hotel = new Hotel();
        hotel.setName(dto.getName());
        hotel.setLocation(dto.getLocation());
        hotel.setDescription(dto.getDescription());
        hotel.setImageUrl(dto.getImageUrl());
        hotel.setManagerId(dto.getManagerId());
        return hotel;
    }
}
