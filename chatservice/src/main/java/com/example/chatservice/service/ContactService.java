package com.example.chatservice.service;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.entity.Contact;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface ContactService {

    List<ContactDTO> getAllContactsByUserId(Long id);

    ContactDTO createContact(ContactDTO contactDTO) throws BadRequestException;
}
