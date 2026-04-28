package StackVerse.Backend.repository;

import StackVerse.Backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r WHERE " +
           "(:location IS NULL OR r.hotel.location LIKE %:location%) AND " +
           "(:minPrice IS NULL OR r.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR r.price <= :maxPrice) AND " +
           "(:minRating IS NULL OR r.rating >= :minRating) AND " +
           "(:amenities IS NULL OR r.amenities LIKE %:amenities%)")
    List<Room> searchRooms(@Param("location") String location,
                           @Param("minPrice") Double minPrice,
                           @Param("maxPrice") Double maxPrice,
                           @Param("minRating") Double minRating,
                           @Param("amenities") String amenities);

    List<Room> findByHotelId(Long hotelId);
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelHotelId(Long hotelId);
    List<Room> findByAvailabilityTrue();
}
