package com.example.chatservice.dto;

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
    private Long userId;
    private String name;
    private String phone;
    private UserDTO userDTO;
}
