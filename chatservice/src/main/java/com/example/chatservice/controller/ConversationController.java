package com.example.chatservice.controller;

import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.MessageDTO;
import com.example.chatservice.service.ConversationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/conversations")
public class ConversationController {
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping
    public ResponseEntity<ConversationDTO> createConversation(@RequestBody ConversationDTO conversationDTO) {
        return ResponseEntity.ok(conversationService.createConversation(conversationDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ConversationDTO> updateConversation(@PathVariable("id") Long id,
                                                              @RequestBody ConversationDTO conversationDTO) {
        return ResponseEntity.ok(conversationService.updateConversation(id, conversationDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteConversation(@PathVariable("id") Long id) {
        return ResponseEntity.ok(conversationService.deleteConversation(id));
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<List<MessageDTO>> getMessages(@PathVariable("id") Long id) {
        return ResponseEntity.ok(conversationService.getMessagesByConversationId(id));
    }
}
