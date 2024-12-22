package com.example.chatservice.service;

import com.example.chatservice.dto.ContactDTO;
import lombok.SneakyThrows;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface ContactService {

    ContactDTO addContact(ContactDTO contactDTO);

    ContactDTO updateContact(Long id, ContactDTO contactDTO);

    Boolean deleteContact(Long id);

    List<ContactDTO> getAllContactsByUserId(Long id);

//    ContactDTO createContact(ContactDTO contactDTO) throws BadRequestException;
}
