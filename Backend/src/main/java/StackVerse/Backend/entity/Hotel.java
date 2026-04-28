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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hotels")
import java.util.List;

@Entity
@Table(name = "Hotels")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String location;
    private String description;
    private String imageUrl;
    
    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private Long hotelId;

    private Long managerId; // Link to User.user_id

    @Column(nullable = false)
    private String name;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Room> rooms;

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
}
