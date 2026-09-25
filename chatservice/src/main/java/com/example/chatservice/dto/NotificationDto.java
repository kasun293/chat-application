package com.example.chatservice.dto;

import lombok.Data;

@Data
public class NotificationDto {

    private String sender;
    private String recipient;
    private String message;
}
