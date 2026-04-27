package com.example.chatservice.service;

import com.example.chatservice.dto.AddContactRequest;
import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.ContactUpdateRequest;
import com.example.chatservice.dto.response.ResponseListDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ContactService {

    ContactDTO addContact(AddContactRequest request);

    ContactDTO updateContact(Long id, ContactUpdateRequest request);

    Boolean deleteContact(Long id);

    List<ContactDTO> getAllContactsByUser();

    ResponseListDTO<ContactDTO> getAllContactsByLoggedInUser(Pageable pageable);

    Long getUserOfContact(Long id);

}
