package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.ReviewDTO;
import StackVerse.Backend.entity.Review;
import StackVerse.Backend.entity.Hotel;
import StackVerse.Backend.entity.User;
import StackVerse.Backend.repository.ReviewRepository;
import StackVerse.Backend.repository.HotelRepository;
import StackVerse.Backend.repository.UserRepository;
import StackVerse.Backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ReviewDTO addReview(ReviewDTO reviewDTO) {
        Review review = new Review();
        
        Hotel hotel = hotelRepository.findById(reviewDTO.getHotelId()).orElse(null);
        User user = userRepository.findById(reviewDTO.getUserId()).orElse(null);
        
        if (hotel != null && user != null) {
            review.setHotel(hotel);
            review.setUser(user);
            review.setRating(reviewDTO.getRating());
            review.setComment(reviewDTO.getComment());
            
            Review savedReview = reviewRepository.save(review);
            return mapToDTO(savedReview);
        }
        return null;
    }

    @Override
    public List<ReviewDTO> getReviewsByHotelId(Long hotelId) {
        return reviewRepository.findByHotelId(hotelId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ReviewDTO mapToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setUserId(review.getUser().getId());
        dto.setUserName(review.getUser().getName());
        dto.setHotelId(review.getHotel().getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
