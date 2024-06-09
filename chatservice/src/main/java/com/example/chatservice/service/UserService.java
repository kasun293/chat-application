package com.example.chatservice.service;

import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    ResponseEntity<UserDTO> registerUser(UserDTO userDto);

    ResponseEntity<UserDTO> loginUser(UserDTO userDto);

    ResponseEntity<UserDTO> saveContact(Long id, List<UserDTO> contacts);

    Boolean deleteContact(Long id);

    ResponseEntity<List<UserDTO>> getAllContacts(Long id);
}
