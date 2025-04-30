package com.example.chatservice.dto;

import com.example.chatservice.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ContactDTO {

    private Long id;
    @NotBlank(message = "Name is required!")
    private String name;
    private String displayName;
    @NotEmpty(message = "Phone number is required!")
    private String phone;
}
