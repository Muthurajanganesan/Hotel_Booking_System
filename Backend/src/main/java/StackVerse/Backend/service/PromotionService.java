package StackVerse.Backend.service;

import StackVerse.Backend.dto.PromotionDTO;
import java.util.List;

public interface PromotionService {
    PromotionDTO createPromotion(PromotionDTO promotionDTO);
    List<PromotionDTO> getAllPromotions();
    void deletePromotion(Long promoId);
}
