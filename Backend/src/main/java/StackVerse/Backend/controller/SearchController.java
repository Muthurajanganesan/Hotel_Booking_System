package StackVerse.Backend.controller;

import StackVerse.Backend.dto.SearchDTO;
import StackVerse.Backend.entity.Hotel;
import StackVerse.Backend.entity.Room;
import StackVerse.Backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api") // Changed from /rooms to /api for better structure
@CrossOrigin(origins = "*")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/hotels")
    public List<Hotel> searchHotels(@RequestParam(required = false) String location) {
        return searchService.searchHotels(location);
    }

    @GetMapping("/hotels/{id}/rooms")
    public List<Room> getRoomsByHotelId(@PathVariable Long id) {
        return searchService.getRoomsByHotelId(id);
    }

    @GetMapping("/rooms")
    public List<Room> searchRooms(@Valid @ModelAttribute SearchDTO searchDTO) {
        return searchService.searchRooms(searchDTO);
    }

    @GetMapping("/rooms/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return searchService.getRoomById(id);
    }
}
