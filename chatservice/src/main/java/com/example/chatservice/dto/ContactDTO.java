package com.example.chatservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ContactDTO {

    private Long id;
    private Long contactUserId;
//    @NotBlank(message = "Name is required!")
    private String name;
    private String displayName;
    @NotEmpty(message = "Phone number is required!")
    private String phone;
}
