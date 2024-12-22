package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.MessageDTO;
import com.example.chatservice.entity.Message;
import com.example.chatservice.repository.MessageRepository;
import com.example.chatservice.service.MessageService;
import com.example.chatservice.util.MapperUtil;
import com.example.chatservice.util.ServiceUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public MessageDTO saveMessage(MessageDTO messageDTO) {
        messageDTO.setTimeStamp(ServiceUtil.timeStampGenerator());
        Message message = messageRepository.save(MapperUtil.map(messageDTO, Message.class));
        return MapperUtil.map(message, MessageDTO.class);

    }

    @Override
    public List<MessageDTO> getAllMessagesByConversation(Long id) {
        List<Message> messages = messageRepository.findAllByConversationId(id);
        return MapperUtil.mapAll(messages, MessageDTO.class);
    }
}
