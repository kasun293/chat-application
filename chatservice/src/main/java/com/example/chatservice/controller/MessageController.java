package com.example.chatservice.controller;

import com.example.chatservice.dto.MessageDTO;
import com.example.chatservice.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/messages")
public class MessageController {

    private final MessageService messageService;

    private final SimpMessageSendingOperations messagingTemplate;

    public MessageController(MessageService messageService, SimpMessageSendingOperations messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping("/conversation/{id}")
    public ResponseEntity<?> getAllMessagesByConversation(@PathVariable("id") Long id) {
        return ResponseEntity.ok(messageService.getAllMessagesByConversation(id));
    }

    @MessageMapping("/chat.send-message")
    public ResponseEntity<?> sendMessage(@RequestBody MessageDTO messageDTO) {
        messagingTemplate.convertAndSend("/topic/" + messageDTO.getConversationId().toString(),messageDTO);
        return ResponseEntity.ok(messageService.saveMessage(messageDTO));
    }
}
