package com.example.chatservice.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ContactUpdateRequest {

    @NotEmpty(message = "Name is required")
    private String displayName;
}
