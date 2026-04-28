package StackVerse.Backend.config;

import StackVerse.Backend.entity.User;
import StackVerse.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin if not exists
        if (!userRepository.existsByEmail("admin@stackverse.com")) {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@stackverse.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
            System.out.println("Default Admin account created: admin@stackverse.com / admin123");
        }
    }
}
