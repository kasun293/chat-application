package com.example.chatservice.service;

import com.example.chatservice.dto.AuthRefreshResponse;
import com.example.chatservice.dto.AuthRequestDTO;
import com.example.chatservice.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(AuthRequestDTO authRequestDTO);

    AuthRefreshResponse userAuthRefresh(String refreshToken);
}
