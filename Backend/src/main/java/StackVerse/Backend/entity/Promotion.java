package StackVerse.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "promotions")
@Data
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promoId;

    @Column(unique = true)
    private String code;
    private BigDecimal discount;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate validUntil;
}
