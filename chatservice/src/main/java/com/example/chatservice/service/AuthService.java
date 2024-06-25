package com.example.chatservice.service;

import com.example.chatservice.dto.AuthRequestDTO;

public interface AuthService {

    String login(AuthRequestDTO authRequestDTO);
}
