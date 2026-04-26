package com.example.chatservice.controller;

import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.dto.response.ResponseListDTO;
import com.example.chatservice.exception.error.ApiError;
import com.example.chatservice.service.ConversationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/conversations")
public class ConversationController {
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @Operation(
            operationId = "createPrivateChat",
            summary = "Create private chat",
            description = "Create private chat",
            tags = {"Conversations"},
            parameters = {@Parameter(in = ParameterIn.QUERY, name = "contactNumber", description = "Contact number", example = "07XXXXXXXX")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Private chat created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @PostMapping("/private")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO<ConversationDTO> createPrivateChat(@RequestParam("contactNumber") final String contactNumber) {
        ResponseDTO<ConversationDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(conversationService.createPrivateChat(contactNumber));
        return responseDTO.updateResponse(responseDTO);
    }

    @Operation(
            operationId = "createGroupChat",
            summary = "Create group chat",
            description = "Create group chat",
            tags = {"Conversations"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Group chat created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid contact details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @PostMapping
    public ResponseDTO<ConversationDTO> createConversation(@RequestBody ConversationDTO conversationDTO) {
        ResponseDTO<ConversationDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(conversationService.createConversation(conversationDTO));
        return responseDTO.updateResponse(responseDTO);
    }

    @Operation(
            operationId = "updateGroupChat",
            summary = "Update group chat",
            description = "Update group chat by chat id",
            tags = {"Conversations"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "id", description = "Chat Id", example = "1")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Group chat updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid contact details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Chat not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @PutMapping("/{id}")
    public ResponseDTO<ConversationDTO> updateConversation(@PathVariable("id") Long id,
                                                           @RequestBody ConversationDTO conversationDTO) {
        ResponseDTO<ConversationDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(conversationService.updateConversation(id, conversationDTO));
        return responseDTO.updateResponse(responseDTO);
    }

    @Operation(
            operationId = "deleteChat",
            summary = "Delete chat",
            description = "Delete chat by id",
            tags = {"Conversations"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "id", description = "Chat Id", example = "1")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Chat deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Chat not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @DeleteMapping("/{id}")
    public ResponseDTO<Boolean> deleteConversation(@PathVariable("id") Long id) {
        ResponseDTO<Boolean> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(conversationService.deleteConversation(id));
        return responseDTO.updateResponse(responseDTO);
    }

    @Operation(
            operationId = "getAllChats",
            summary = "Get all chats",
            description = "Get all chats by logged in user",
            tags = {"Conversations"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Chat list returned successfully"),
            @ApiResponse(responseCode = "404", description = "Chats not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @GetMapping
    public ResponseListDTO<ConversationDTO> getAllConversations() {
        ResponseListDTO<ConversationDTO> responseListDTO = new ResponseListDTO<>();
        responseListDTO.setPayloadDto(conversationService.getAllConversations());
        return responseListDTO.updateResponse(responseListDTO);
    }

}
