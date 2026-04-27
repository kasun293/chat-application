package com.example.chatservice.repository;

import com.example.chatservice.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByUserIdAndIsRevokedFalse(Long userId);

    Optional<RefreshToken> findByToken(String refreshToken);
}