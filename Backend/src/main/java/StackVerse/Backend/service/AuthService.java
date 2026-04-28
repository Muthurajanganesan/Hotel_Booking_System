package StackVerse.Backend.service;

import StackVerse.Backend.dto.AuthRequestDTO;
import StackVerse.Backend.dto.AuthResponseDTO;
import StackVerse.Backend.dto.UserDTO;

public interface AuthService {
    AuthResponseDTO login(AuthRequestDTO request);
    UserDTO signup(UserDTO userDTO, String password);
    void forgotPassword(String email);
    void resetPassword(String email, String otp, String newPassword);
}
