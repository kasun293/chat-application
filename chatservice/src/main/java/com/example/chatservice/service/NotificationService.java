package com.example.chatservice.service;

import com.example.chatservice.dto.NotificationDto;

public interface NotificationService {


    void sendNotification(NotificationDto notificationDto);
}
