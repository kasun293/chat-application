package com.example.chatservice.service;

import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.entity.User;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    ResponseEntity<UserDTO> registerUser (UserDTO userDto) throws BadRequestException;

    ResponseEntity<UserDTO> loginUser(String username, String password) throws BadRequestException;

    ResponseEntity<UserDTO> saveContact(Long id, List<UserDTO> contacts);

    Boolean deleteContact(Long id);

    ResponseEntity<List<UserDTO>> getAllContacts(Long id);

    ResponseEntity<UserDTO> getLoggedInUser() throws BadRequestException;
}
