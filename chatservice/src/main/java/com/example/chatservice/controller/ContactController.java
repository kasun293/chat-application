package com.example.chatservice.controller;

import com.example.chatservice.dto.AddContactRequest;
import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.ContactUpdateRequest;
import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.dto.response.ResponseListDTO;
import com.example.chatservice.exception.error.ApiError;
import com.example.chatservice.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @Operation(
            operationId = "addContact",
            summary = "Add new contact",
            description = "Add new contact to the contact list",
            tags = {"Contacts"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contact added successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid contact details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO<ContactDTO> addContacts(@RequestBody @Valid AddContactRequest contact) {
        ResponseDTO<ContactDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(contactService.addContact(contact));
        return responseDTO.updateResponse(responseDTO);
    }

    @Operation(
            operationId = "updateContact",
            summary = "Update contact",
            description = "Update contact by id",
            tags = {"Contacts"},
            parameters = {@Parameter(in = ParameterIn.PATH, name = "id", description = "Contact Id", example = "1")})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contact updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid contact details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Contact not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @PutMapping("/{id}")
    public ResponseDTO<ContactDTO> updateContact(@PathVariable Long id, @RequestBody @Valid ContactUpdateRequest request) {
        ResponseDTO<ContactDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(contactService.updateContact(id, request));
        return responseDTO.updateResponse(responseDTO);
    }

    @Operation(
            operationId = "getContacts",
            summary = "Get contacts",
            description = "Get contact list with pagination by logged in user",
            tags = {"Contacts"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contact list returned successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid contact details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Contacts not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @GetMapping
    public ResponseListDTO<ContactDTO> getAllContactsByLoggedInUser(@PageableDefault Pageable pageable) {
        ResponseListDTO<ContactDTO> responseListDTO = contactService.getAllContactsByLoggedInUser(pageable);
        return responseListDTO.updateResponse(responseListDTO);
    }

    @Operation(
            operationId = "getContacts",
            summary = "Get contacts",
            description = "Get contact list by logged in user",
            tags = {"Contacts"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contact list returned successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid contact details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Contacts not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @GetMapping("/list")
    public ResponseListDTO<ContactDTO> getAllContactListByLoggedInUser() {
        List<ContactDTO> response = contactService.getAllContactsByUser();
        ResponseListDTO<ContactDTO> responseListDTO = new ResponseListDTO<>();
        responseListDTO.setPayloadDto(response);
        return responseListDTO.updateResponse(responseListDTO);
    }

    @Operation(
            operationId = "deleteContact",
            summary = "Delete contacts",
            description = "Delete contact by contactId",
            tags = {"Contacts"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contact deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid contact details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Contacts not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @DeleteMapping("/{id}")
    public ResponseDTO<Boolean> deleteContact(@PathVariable Long id) {
        ResponseDTO<Boolean> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(contactService.deleteContact(id));
        return responseDTO.updateResponse(responseDTO);
    }


}
