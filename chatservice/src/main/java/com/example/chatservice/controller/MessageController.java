package com.example.chatservice.controller;

import com.example.chatservice.dto.MessageDTO;
import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.dto.response.ResponseListDTO;
import com.example.chatservice.service.MessageService;
import com.example.chatservice.util.ServiceUtil;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

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
    public ResponseListDTO<?> getAllMessagesByConversation(@PathVariable("id") Long id) {
        ResponseListDTO<MessageDTO> responseListDTO = new ResponseListDTO<>();
        responseListDTO.setPayloadDto(messageService.getAllMessagesByConversation(id));
        return ServiceUtil.updateResponse(responseListDTO);
    }

    @MessageMapping("/send-message")
    public ResponseDTO<?> sendMessage(@RequestBody MessageDTO messageDTO) {
        messagingTemplate.convertAndSend("/topic/" + messageDTO.getConversationId().toString(), messageDTO);
        ResponseDTO<MessageDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(messageService.saveMessage(messageDTO));
        return ServiceUtil.updateResponse(responseDTO);
    }
}
