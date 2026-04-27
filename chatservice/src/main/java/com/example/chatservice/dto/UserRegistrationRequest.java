package com.example.chatservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserRegistrationRequest {

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Confirmation password is required")
    private String confirmPassword;

    private String displayName;

    @NotBlank(message = "Mobile number is required")
    private String userName;
}
