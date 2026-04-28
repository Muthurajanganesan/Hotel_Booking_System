package StackVerse.Backend.service;

import StackVerse.Backend.dto.ReviewDTO;
import java.util.List;

public interface ReviewService {
    ReviewDTO addReview(ReviewDTO reviewDTO);
    List<ReviewDTO> getReviewsByHotelId(Long hotelId);
}
