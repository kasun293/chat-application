package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.MessageDTO;
import com.example.chatservice.entity.Contact;
import com.example.chatservice.entity.Conversation;
import com.example.chatservice.entity.User;
import com.example.chatservice.exception.NotFoundException;
import com.example.chatservice.repository.ConversationRepository;
import com.example.chatservice.service.ConversationService;
import com.example.chatservice.service.MessageService;
import com.example.chatservice.util.ContextUtils;
import com.example.chatservice.util.MapperUtil;
import com.example.chatservice.util.ServiceUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConversationServiceImpl implements ConversationService {
    private final MessageService messageService;
    private final ContextUtils contextUtils;
    private final ConversationRepository conversationRepository;

    public ConversationServiceImpl(MessageService messageService, ContextUtils contextUtils, ConversationRepository conversationRepository) {
        this.messageService = messageService;
        this.contextUtils = contextUtils;
        this.conversationRepository = conversationRepository;
    }

    @Override
    public List<MessageDTO> getMessagesByConversationId(Long id) {
        return messageService.getAllMessagesByConversation(id);
    }

    @Override
    public ConversationDTO createConversation(ConversationDTO conversationDTO) {
        Long date = ServiceUtil.timeStampGenerator();
        User user = contextUtils.getLoggedInUserEntity();
        List<Contact> contactList = new ArrayList<>();
        Conversation conversation = MapperUtil.map(conversationDTO, Conversation.class);
        if(!conversationDTO.getContacts().isEmpty()) {
            for(ContactDTO contactDTO : conversationDTO.getContacts()) {
                contactList.add(MapperUtil.map(contactDTO, Contact.class));
            }
        }
        conversation.setContactList(contactList);
        conversation.setConversationType(conversationDTO.getConversationType());
        conversation.setCreatedDate(date);
        conversation.setCreatedBy(user.getId());
        conversation.setUser(user);
        return MapperUtil.map(conversationRepository.save(conversation), ConversationDTO.class);
    }

    @Override
    public ConversationDTO updateConversation(Long id, ConversationDTO conversationDTO) {
        Conversation conversation = conversationRepository.findById(id).orElseThrow(() ->
                new NotFoundException("Conversation Not Found with id: " + id));
        return MapperUtil.map(conversationRepository.save(conversation), ConversationDTO.class);
    }

    @Override
    public Boolean deleteConversation(Long id) {
        if (!conversationRepository.existsById(id)) {
            throw new NotFoundException("Conversation Not Found with id: " + id);
        }
        conversationRepository.deleteById(id);
        return true;
    }

    @Override
    public List<ConversationDTO> getAllConversationsByUserId(Long id) {
        return MapperUtil.mapAll(conversationRepository.findAllByUserId(id), ConversationDTO.class);
    }
}
