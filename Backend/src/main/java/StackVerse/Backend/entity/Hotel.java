package StackVerse.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hotels")
@Data
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelId;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    private String name;
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
}
