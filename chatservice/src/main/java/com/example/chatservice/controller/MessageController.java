package com.example.chatservice.controller;

import com.example.chatservice.dto.MessageDTO;
import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.dto.response.ResponseListDTO;
import com.example.chatservice.exception.error.ApiError;
import com.example.chatservice.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(
            operationId = "getAllMessages",
            summary = "Get all messages for chat",
            description = "Get all messages by chat id",
            tags = {"Messages"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "id", description = "Chat Id", example = "1")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Messages returned successfully"),
            @ApiResponse(responseCode = "404", description = "Chat not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @GetMapping("/conversation/{id}")
    public ResponseListDTO<?> getAllMessagesByConversation(@PathVariable("id") Long id) {
        ResponseListDTO<MessageDTO> responseListDTO = new ResponseListDTO<>();
        responseListDTO.setPayloadDto(messageService.getAllMessagesByConversation(id));
        return responseListDTO.updateResponse(responseListDTO);
    }

    @MessageMapping("/send-message")
    public ResponseDTO<MessageDTO> sendMessage(@RequestBody MessageDTO messageDTO) {
        messageService.sendMessage(messageDTO);
        ResponseDTO<MessageDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(messageService.saveMessage(messageDTO));
        return responseDTO.updateResponse(responseDTO);
    }

    @Operation(
            operationId = "sendMessageManually",
            summary = "Send message manually",
            description = "Send message to user manually by REST API",
            tags = {"Messages"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "id", description = "Chat Id", example = "1")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Messages send successfully"),
            @ApiResponse(responseCode = "404", description = "Chat not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @PostMapping("/users/{userId}")
    public ResponseDTO<?> sendMessageToUserManually(@PathVariable("userId") Long id, @RequestBody MessageDTO messageDTO) {
        messagingTemplate.convertAndSend("/topic/" + id.toString(), messageDTO);
        ResponseDTO<MessageDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(messageDTO);
        return responseDTO.updateResponse(responseDTO);
    }
}
