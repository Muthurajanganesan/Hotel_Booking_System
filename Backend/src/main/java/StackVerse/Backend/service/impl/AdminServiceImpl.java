package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.HotelDTO;
import StackVerse.Backend.entity.Hotel;
import StackVerse.Backend.repository.HotelRepository;
import StackVerse.Backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public List<HotelDTO> getPendingHotelRequests() {
        return hotelRepository.findByStatus(Hotel.Status.PENDING).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public void approveHotel(Long hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId).orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.setStatus(Hotel.Status.APPROVED);
        hotelRepository.save(hotel);
    }

    @Override
    public void rejectHotel(Long hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId).orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotel.setStatus(Hotel.Status.REJECTED);
        hotelRepository.save(hotel);
    }

    @Override
    public void deleteHotel(Long hotelId) {
        hotelRepository.deleteById(hotelId);
    }

    private HotelDTO convertToDTO(Hotel hotel) {
        HotelDTO dto = new HotelDTO();
        dto.setHotelId(hotel.getHotelId());
        dto.setName(hotel.getName());
        dto.setLocation(hotel.getLocation());
        dto.setDescription(hotel.getDescription());
        dto.setImageUrl(hotel.getImageUrl());
        dto.setStatus(hotel.getStatus());
        if (hotel.getManager() != null) {
            dto.setManagerName(hotel.getManager().getName());
        }
        return dto;
    }
}
