package StackVerse.Backend.controller;

import StackVerse.Backend.dto.ReviewDTO;
import StackVerse.Backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ReviewDTO addReview(@Valid @RequestBody ReviewDTO reviewDTO) {
        return reviewService.addReview(reviewDTO);
    }

    @GetMapping("/{hotelId}")
    public List<ReviewDTO> getReviewsByHotelId(@PathVariable Long hotelId) {
        return reviewService.getReviewsByHotelId(hotelId);
    }
}
