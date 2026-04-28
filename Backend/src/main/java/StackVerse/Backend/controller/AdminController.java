package StackVerse.Backend.controller;

import StackVerse.Backend.dto.HotelDTO;
import StackVerse.Backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/hotels")
@CrossOrigin(origins = "*") 
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/requests")
    public ResponseEntity<List<HotelDTO>> getPendingRequests() {
        return ResponseEntity.ok(adminService.getPendingHotelRequests());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Void> approveHotel(@PathVariable Long id) {
        adminService.approveHotel(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Void> rejectHotel(@PathVariable Long id) {
        adminService.rejectHotel(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        adminService.deleteHotel(id);
        return ResponseEntity.ok().build();
    }
}
