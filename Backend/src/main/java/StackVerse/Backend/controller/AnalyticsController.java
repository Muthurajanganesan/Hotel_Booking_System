package StackVerse.Backend.controller;

import StackVerse.Backend.dto.AnalyticsDTO;
import StackVerse.Backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/revenue")
    public ResponseEntity<AnalyticsDTO> getRevenueAnalytics() {
        return ResponseEntity.ok(analyticsService.getRevenueAnalytics());
    }

    @GetMapping("/occupancy")
    public ResponseEntity<AnalyticsDTO> getOccupancyAnalytics() {
        return ResponseEntity.ok(analyticsService.getOccupancyAnalytics());
    }
}
