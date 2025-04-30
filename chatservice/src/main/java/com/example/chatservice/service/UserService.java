package com.example.chatservice.service;

import com.example.chatservice.dto.UserDTO;

public interface UserService {

    UserDTO registerUser(UserDTO userDto);

    UserDTO getLoggedInUser();

}
