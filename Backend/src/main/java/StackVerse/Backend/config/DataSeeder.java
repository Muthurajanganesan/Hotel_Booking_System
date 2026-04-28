package StackVerse.Backend.config;

import StackVerse.Backend.entity.Hotel;
import StackVerse.Backend.entity.Room;
import StackVerse.Backend.entity.Review;
import StackVerse.Backend.entity.User;
import StackVerse.Backend.repository.HotelRepository;
import StackVerse.Backend.repository.RoomRepository;
import StackVerse.Backend.repository.ReviewRepository;
import StackVerse.Backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(HotelRepository hotelRepository, 
                                   RoomRepository roomRepository, 
                                   ReviewRepository reviewRepository,
                                   UserRepository userRepository) {
        return args -> {
            if (hotelRepository.count() == 0) {
                // 1. Create Sample User
                User admin = new User();
                admin.setName("Muthu Rajan");
                admin.setEmail("admin@hotelverse.com");
                admin.setPassword("password123");
                admin.setRole(User.Role.ADMIN);
                userRepository.save(admin);

                // 2. Create Sample Hotels
                Hotel h1 = new Hotel();
                h1.setName("Grand Palace Salem");
                h1.setLocation("Salem");
                h1.setDescription("A luxurious stay in the heart of Salem with premium amenities.");
                h1.setStatus(Hotel.Status.APPROVED);
                h1.setImageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800");
                hotelRepository.save(h1);

                Hotel h2 = new Hotel();
                h2.setName("Ocean View Resort");
                h2.setLocation("Chennai");
                h2.setDescription("Relaxing beachfront resort with stunning ocean views.");
                h2.setStatus(Hotel.Status.APPROVED);
                h2.setImageUrl("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800");
                hotelRepository.save(h2);

                // 3. Create Sample Rooms
                Room r1 = new Room();
                r1.setHotel(h1);
                r1.setPrice(2500.0);
                r1.setRating(9.0);
                r1.setAmenities("WiFi, AC, TV, Breakfast");
                r1.setAvailability(true);
                roomRepository.save(r1);

                Room r2 = new Room();
                r2.setHotel(h1);
                r2.setPrice(4500.0);
                r2.setRating(9.5);
                r2.setAmenities("WiFi, AC, TV, Mini Bar, Balcony");
                r2.setAvailability(true);
                roomRepository.save(r2);

                Room r3 = new Room();
                r3.setHotel(h2);
                r3.setPrice(3500.0);
                r3.setRating(8.5);
                r3.setAmenities("WiFi, AC, Sea View");
                r3.setAvailability(true);
                roomRepository.save(r3);

                // 4. Create Sample Reviews
                Review rev1 = new Review();
                rev1.setHotel(h1);
                rev1.setUser(admin);
                rev1.setRating(9.0);
                rev1.setComment("Amazing hospitality and very clean rooms. Worth the price!");
                rev1.setCreatedAt(LocalDateTime.now());
                reviewRepository.save(rev1);

                System.out.println("✅ Sample data seeded successfully into 'hotel' database!");
            }
        };
    }
}
