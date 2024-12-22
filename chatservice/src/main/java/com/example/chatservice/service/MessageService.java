package com.example.chatservice.service;

import com.example.chatservice.dto.MessageDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MessageService {

    //save message
    MessageDTO saveMessage(MessageDTO messageDTO);

    //delete message

    //get all messages by conversation
    List<MessageDTO> getAllMessagesByConversation(Long id);
}
