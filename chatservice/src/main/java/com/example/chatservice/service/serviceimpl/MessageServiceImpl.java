package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.MessageDTO;
import com.example.chatservice.entity.Message;
import com.example.chatservice.repository.MessageRepository;
import com.example.chatservice.service.MessageService;
import com.example.chatservice.util.MapperUtil;
import com.example.chatservice.util.ServiceUtil;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public ResponseEntity<MessageDTO> saveMessage(MessageDTO messageDTO) {
        messageDTO.setTimeStamp(ServiceUtil.timeStampGenerator());
        Message message = messageRepository.save(MapperUtil.map(messageDTO, Message.class));
        return ResponseEntity.ok(MapperUtil.map(message, MessageDTO.class));

    }

    @Override
    public ResponseEntity<List<MessageDTO>> getAllMessagesByConversation(Long id) {
        List<Message> messages = messageRepository.findAllByConversationId(id);
        return ResponseEntity.ok(MapperUtil.mapAll(messages, MessageDTO.class));
    }
}
