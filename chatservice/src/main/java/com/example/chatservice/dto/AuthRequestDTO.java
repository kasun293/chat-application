package com.example.chatservice.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDTO {

    private String username;
    private String password;
}

