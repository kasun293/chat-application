package com.example.chatservice.service;

import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.MessageDTO;

import java.util.List;

public interface ConversationService {

    List<MessageDTO> getMessagesByConversationId(Long id);

    ConversationDTO createConversation(ConversationDTO conversationDTO);

    ConversationDTO updateConversation(Long id, ConversationDTO conversationDTO);

    Boolean deleteConversation(Long id);

    List<ConversationDTO> getAllConversationsByUserId(Long id);

    List<ConversationDTO> getAllConversations();
}
