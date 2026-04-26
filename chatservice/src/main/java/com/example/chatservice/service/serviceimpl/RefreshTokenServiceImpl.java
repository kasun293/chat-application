package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.entity.RefreshToken;
import com.example.chatservice.repository.RefreshTokenRepository;
import com.example.chatservice.service.RefreshTokenService;
import com.example.chatservice.util.DateUtil;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public List<RefreshToken> findAll() {
        return List.of();
    }

    @Override
    public RefreshToken findByToken(String token) {
        return null;
    }

    @Override
    public void saveNewRefreshToken(String newRefreshToken, Long userId) {
        // find non revoked by user id
        Optional<RefreshToken> existingToken = refreshTokenRepository.findByUserIdAndIsRevokedFalse(userId);
        // if exist revoke it
        if (existingToken.isPresent()) {
            existingToken.get().setRevoked(true);
            refreshTokenRepository.save(existingToken.get());
        }
        // save new refresh token
        RefreshToken newEntity = createEntity(newRefreshToken, userId);
        refreshTokenRepository.save(newEntity);


    }

    @Override
    public RefreshToken getValidRefreshToken(String refreshToken) {
        // find by token
        Optional<RefreshToken> existingToken = refreshTokenRepository.findByToken(refreshToken);
        // if exist, validate not revoked and expired
        if (existingToken.isEmpty() ||  existingToken.get().isRevoked() || existingToken.get().getExpiryDate().isBefore(Instant.now())) {
            throw new SecurityException("Invalid refresh token");
        }
        RefreshToken entity = existingToken.get();
        entity.setRevoked(true);
        return refreshTokenRepository.save(entity);
    }

    private RefreshToken createEntity(String token, Long userId) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setUserId(userId);
        refreshToken.setExpiryDate(Instant.now().plusSeconds(7 * 24 * 60 * 60)); // 7 days
        refreshToken.setRevoked(false);
        return refreshToken;
    }
}
