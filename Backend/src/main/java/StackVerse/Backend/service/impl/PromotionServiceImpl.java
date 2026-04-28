package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.PromotionDTO;
import StackVerse.Backend.entity.Promotion;
import StackVerse.Backend.repository.PromotionRepository;
import StackVerse.Backend.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public PromotionDTO createPromotion(PromotionDTO dto) {
        if (promotionRepository.existsByCode(dto.getCode())) {
            throw new IllegalArgumentException("Promotion code already exists");
        }

        Promotion promotion = new Promotion();
        promotion.setCode(dto.getCode());
        promotion.setDiscount(dto.getDiscount());
        promotion.setDescription(dto.getDescription());
        promotion.setValidUntil(dto.getValidUntil());
        
        Promotion saved = promotionRepository.save(promotion);
        dto.setPromoId(saved.getPromoId());
        return dto;
    }

    @Override
    public List<PromotionDTO> getAllPromotions() {
        return promotionRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public void deletePromotion(Long promoId) {
        promotionRepository.deleteById(promoId);
    }

    private PromotionDTO convertToDTO(Promotion promo) {
        PromotionDTO dto = new PromotionDTO();
        dto.setPromoId(promo.getPromoId());
        dto.setCode(promo.getCode());
        dto.setDiscount(promo.getDiscount());
        dto.setDescription(promo.getDescription());
        dto.setValidUntil(promo.getValidUntil());
        return dto;
    }
}
