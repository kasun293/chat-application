package com.example.chatservice.controller;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.service.ContactService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<?> addContacts(@RequestBody @Validated ContactDTO contact) throws BadRequestException {
        return ResponseEntity.ok(contactService.addContact(contact));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable Long id, @RequestBody ContactDTO contact) throws BadRequestException {
        return ResponseEntity.ok(contactService.updateContact(id, contact));
    }


}
