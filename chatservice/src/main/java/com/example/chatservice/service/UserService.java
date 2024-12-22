package com.example.chatservice.service;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.UserDTO;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    UserDTO registerUser (UserDTO userDto);

//    ResponseEntity<UserDTO> loginUser(String username, String password) throws BadRequestException;
//
//    ResponseEntity<UserDTO> saveContact(Long id, List<UserDTO> contacts);
//
//    Boolean deleteContact(Long id);
//
//    ResponseEntity<List<UserDTO>> getAllContacts(Long id);

    UserDTO getLoggedInUser();

    List<ContactDTO> getContactsByUserId(Long userId);

    List<ConversationDTO> getConversationsByUserId(Long userId);
}
