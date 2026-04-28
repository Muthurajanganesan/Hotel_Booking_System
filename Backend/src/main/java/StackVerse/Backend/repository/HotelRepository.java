package StackVerse.Backend.repository;

import StackVerse.Backend.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByManagerId(Long managerId);
    List<Hotel> findByStatus(Hotel.Status status);
}
