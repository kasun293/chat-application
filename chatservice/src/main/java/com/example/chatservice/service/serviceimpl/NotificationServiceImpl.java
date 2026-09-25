package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.NotificationDto;
import com.example.chatservice.service.NotificationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Log4j2
public class NotificationServiceImpl implements NotificationService {

    private final WebClient webClient;

    public NotificationServiceImpl(WebClient.Builder builder) {
        this.webClient = WebClient.builder()
                .baseUrl("http://notification-server")
                .build();
    }


    @Override
    public void sendNotification(NotificationDto notificationDto) {
        webClient.post()
                .uri("/api/v1/notifications")
                .accept(MediaType.APPLICATION_JSON)
                .body(Mono.just(notificationDto), NotificationDto.class)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
