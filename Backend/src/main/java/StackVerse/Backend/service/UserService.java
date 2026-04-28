package StackVerse.Backend.service;

import StackVerse.Backend.dto.UserDTO;

public interface UserService {
    UserDTO getUserProfile(Long id);
    UserDTO updateUserProfile(Long id, UserDTO userDTO);
}
