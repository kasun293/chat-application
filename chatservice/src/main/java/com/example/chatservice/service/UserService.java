package com.example.chatservice.service;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO registerUser(UserDTO userDto);

    UserDTO getLoggedInUser();

}
