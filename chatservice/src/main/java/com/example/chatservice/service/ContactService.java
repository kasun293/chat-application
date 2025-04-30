package com.example.chatservice.service;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.response.ResponseListDTO;

import java.util.List;

public interface ContactService {

    ContactDTO addContact(ContactDTO contactDTO);

    ContactDTO updateContact(Long id, ContactDTO contactDTO);

    Boolean deleteContact(Long id);

    List<ContactDTO> getAllContactsByUserId(Long id);

    ResponseListDTO<ContactDTO> getAllContactsByLoggedInUser();

}
