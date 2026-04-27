package com.example.chatservice.service;

import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.dto.UserRegistrationRequest;
import com.example.chatservice.dto.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRegistrationRequest request);

    UserDTO registerUser(UserDTO userDto);

    UserResponse getLoggedInUser();

}
