package StackVerse.Backend.controller;

import StackVerse.Backend.dto.*;
import StackVerse.Backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signup(@RequestBody SignupRequest request) {
        UserDTO userDTO = UserDTO.builder()
                .name(request.getName())
                .email(request.getEmail())
                .role(request.getRole())
                .build();
        return ResponseEntity.ok(authService.signup(userDTO, request.getPassword()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody ForgotPasswordDTO request) {
        authService.forgotPassword(request.getEmail());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordDTO request) {
        authService.resetPassword(request.getEmail(), request.getOtp(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }
}

/**
 * Internal request class for /auth/signup to accept name + email + password + role in one body.
 */
class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String role;

    public String getName()     { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail()    { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole()     { return role; }
    public void setRole(String role) { this.role = role; }
}
