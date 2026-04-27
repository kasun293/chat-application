package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.entity.Contact;
import com.example.chatservice.entity.Conversation;
import com.example.chatservice.entity.User;
import com.example.chatservice.enums.ConversationType;
import com.example.chatservice.exception.BadRequestException;
import com.example.chatservice.exception.NotFoundException;
import com.example.chatservice.repository.ContactRepository;
import com.example.chatservice.repository.ConversationRepository;
import com.example.chatservice.service.ConversationService;
import com.example.chatservice.transformer.ConversationTransformer;
import com.example.chatservice.util.ContextUtils;
import com.example.chatservice.util.MapperUtil;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ConversationServiceImpl implements ConversationService {
    private final ContextUtils contextUtils;
    private final ConversationRepository conversationRepository;
    private final ContactRepository contactRepository;
    private final ConversationTransformer conversationTransformer;

    public ConversationServiceImpl(ContextUtils contextUtils, ConversationRepository conversationRepository, ContactRepository contactRepository, ConversationTransformer conversationTransformer) {
        this.contextUtils = contextUtils;
        this.conversationRepository = conversationRepository;
        this.contactRepository = contactRepository;
        this.conversationTransformer = conversationTransformer;
    }

    @Override
    public ConversationDTO createConversation(ConversationDTO conversationDTO) {
        User user = contextUtils.getLoggedInUserEntity();
        Set<User> users = new HashSet<>();
        Conversation conversation = MapperUtil.map(conversationDTO, Conversation.class);
        if (!conversationDTO.getContacts().isEmpty()) {
            for (ContactDTO contactDTO : conversationDTO.getContacts()) {
                Contact contact = contactRepository.findById(contactDTO.getId()).orElseThrow(NotFoundException::new);
                users.add(contact.getContactUser());
            }
        } else {
            throw new BadRequestException("At least one contact must be provided");
        }
        conversation.setContactList(users);
        conversation.setConversationType(conversationDTO.getConversationType());
        conversation.setCreatedBy(user);
        Conversation saved = conversationRepository.save(conversation);
        return MapperUtil.map(saved, ConversationDTO.class);
    }

    @Override
    public ConversationDTO createPrivateChat(String contactNumber) {
        User user = contextUtils.getLoggedInUserEntity();
        Contact contact = contactRepository.findByMobileNumber(contactNumber);
        Conversation conversation = conversationRepository.findPrivateChatByUserIdAndContactId(user.getId(), contact.getContactUser().getId());
        if (conversation == null) {
            conversation = new Conversation();
            conversation.setCreatedBy(user);
            conversation.setConversationType(ConversationType.INDIVIDUAL);
            conversation.setContactList(Set.of(contact.getContactUser(), user));
            conversationRepository.save(conversation);
        }
        return conversationTransformer.toDTO(conversation);
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

    @Override
    public List<ConversationDTO> getAllConversations() {
        User user = contextUtils.getLoggedInUserEntity();
        List<Conversation> conversationList = conversationRepository.findAllByUser(user.getId());
        return conversationTransformer.toDTOList(conversationList);
    }

    @Override
    public ConversationDTO getConversationById(Long id) {
        Conversation conversation = conversationRepository.findById(id).orElse(null);
        return conversationTransformer.toDTO(conversation);
    }
}
