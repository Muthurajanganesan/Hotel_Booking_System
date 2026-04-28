package StackVerse.Backend.service.impl;

import StackVerse.Backend.dto.UserDTO;
import StackVerse.Backend.entity.User;
import StackVerse.Backend.repository.UserRepository;
import StackVerse.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDTO getUserProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Override
    public UserDTO updateUserProfile(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDTO.getName());
        User saved = userRepository.save(user);
        return UserDTO.builder()
                .id(saved.getId())
                .name(saved.getName())
                .email(saved.getEmail())
                .role(saved.getRole())
                .build();
    }
}
