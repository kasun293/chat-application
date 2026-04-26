package com.example.chatservice.service;

import com.example.chatservice.dto.MessageDTO;

import java.util.List;

public interface MessageService {

    void sendMessage(MessageDTO messageDTO);

    //save message
    MessageDTO saveMessage(MessageDTO messageDTO);

    //delete message

    //get all messages by conversation
    List<MessageDTO> getAllMessagesByConversation(Long id);

}
