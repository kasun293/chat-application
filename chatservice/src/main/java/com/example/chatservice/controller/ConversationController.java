package com.example.chatservice.controller;

import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.dto.response.ResponseListDTO;
import com.example.chatservice.service.ConversationService;
import com.example.chatservice.util.ServiceUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/conversations")
public class ConversationController {
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping
    public ResponseDTO<?> createConversation(@RequestBody ConversationDTO conversationDTO) {
        ResponseDTO<ConversationDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(conversationService.createConversation(conversationDTO));
        return ServiceUtil.updateResponse(responseDTO);
    }

    @PutMapping("/{id}")
    public ResponseDTO<?> updateConversation(@PathVariable("id") Long id,
                                             @RequestBody ConversationDTO conversationDTO) {
        ResponseDTO<ConversationDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(conversationService.updateConversation(id, conversationDTO));
        return ServiceUtil.updateResponse(responseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<?> deleteConversation(@PathVariable("id") Long id) {
        ResponseDTO<Boolean> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(conversationService.deleteConversation(id));
        return ServiceUtil.updateResponse(responseDTO);
    }

    @GetMapping
    public ResponseListDTO<?> getAllConversations() {
        ResponseListDTO<ConversationDTO> responseListDTO = new ResponseListDTO<>();
        responseListDTO.setPayloadDto(conversationService.getAllConversations());
        return ServiceUtil.updateResponse(responseListDTO);
    }

}
