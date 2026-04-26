package com.example.chatservice.service;

import com.example.chatservice.entity.RefreshToken;
import org.springframework.stereotype.Service;

import java.util.List;

public interface RefreshTokenService {

    List<RefreshToken> findAll();
    RefreshToken findByToken(String token);

    void saveNewRefreshToken(String newRefreshToken, Long userId);

    RefreshToken getValidRefreshToken(String refreshToken);


}
