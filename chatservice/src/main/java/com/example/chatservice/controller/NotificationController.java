package com.example.chatservice.controller;

import com.example.chatservice.dto.NotificationDto;
import com.example.chatservice.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Void> sendNotification(@RequestBody NotificationDto notificationDto) {
        notificationService.sendNotification(notificationDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
