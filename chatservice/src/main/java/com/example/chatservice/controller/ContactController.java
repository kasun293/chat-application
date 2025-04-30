package com.example.chatservice.controller;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.dto.response.ResponseListDTO;
import com.example.chatservice.service.ContactService;
import com.example.chatservice.util.ServiceUtil;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseDTO<?> addContacts(@RequestBody @Validated ContactDTO contact) {
        ResponseDTO<ContactDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(contactService.addContact(contact));
        return ServiceUtil.updateResponse(responseDTO);
    }

    @PutMapping("/{id}")
    public ResponseDTO<?> updateContact(@PathVariable Long id, @RequestBody ContactDTO contact) {
        ResponseDTO<ContactDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(contactService.updateContact(id, contact));
        return ServiceUtil.updateResponse(responseDTO);
    }

    @GetMapping
    public ResponseListDTO<?> getAllContactsByLoggedInUser() {
        ResponseListDTO<ContactDTO> responseListDTO = contactService.getAllContactsByLoggedInUser();
        return ServiceUtil.updateResponse(responseListDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<?> deleteContact(@PathVariable Long id) {
        ResponseDTO<Boolean> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(contactService.deleteContact(id));
        return ServiceUtil.updateResponse(responseDTO);
    }


}
