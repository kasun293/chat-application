package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.MessageDTO;
import com.example.chatservice.entity.Message;
import com.example.chatservice.repository.MessageRepository;
import com.example.chatservice.service.ContactService;
import com.example.chatservice.service.ConversationService;
import com.example.chatservice.service.MessageService;
import com.example.chatservice.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final SimpMessageSendingOperations messagingTemplate;
    private final ConversationService conversationService;
    private final ContactService contactService;

    @Override
    public void sendMessage(MessageDTO messageDTO) {
        ConversationDTO conversationDTO = conversationService.getConversationById(messageDTO.getConversationId());
        Long contactId = getContactId(messageDTO.getSenderId(), conversationDTO);
//        Long userId = contactService.getUserOfContact(contactId);
        messagingTemplate.convertAndSend("/topic/" + contactId, messageDTO);
    }

    private Long getContactId(Long senderId, ConversationDTO conversationDTO) {
        return conversationDTO.getContacts().stream().filter(contact -> !contact.getId().equals(senderId)).findFirst().get().getId();
    }

    @Override
    public MessageDTO saveMessage(MessageDTO messageDTO) {
        Message message = messageRepository.save(MapperUtil.map(messageDTO, Message.class));
        return MapperUtil.map(message, MessageDTO.class);

    }

    @Override
    public List<MessageDTO> getAllMessagesByConversation(Long id) {
        List<Message> messages = messageRepository.findAllByConversationId(id);
        return MapperUtil.mapAll(messages, MessageDTO.class);
    }
}
