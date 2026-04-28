package StackVerse.Backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordDTO {
    private String email;
    private String otp;
    private String newPassword;
}
