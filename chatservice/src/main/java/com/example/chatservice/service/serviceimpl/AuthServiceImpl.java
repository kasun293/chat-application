package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.AuthRefreshResponse;
import com.example.chatservice.dto.AuthRequestDTO;
import com.example.chatservice.dto.LoginResponse;
import com.example.chatservice.entity.RefreshToken;
import com.example.chatservice.entity.User;
import com.example.chatservice.exception.NotFoundException;
import com.example.chatservice.repository.UserRepository;
import com.example.chatservice.security.JwtTokenProvider;
import com.example.chatservice.service.AuthService;
import com.example.chatservice.service.RefreshTokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserRepository userRepository, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public LoginResponse login(AuthRequestDTO authRequestDTO) {

        Optional<User> user = userRepository.findByUserName(authRequestDTO.getUsername());

        if (user.isPresent()) {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    user.get().getUsername(),
                    authRequestDTO.getPassword()
            ));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtTokenProvider.generateToken(authentication.getName());
            String refreshToken = jwtTokenProvider.generateRefreshToken();
            refreshTokenService.saveNewRefreshToken(refreshToken, user.get().getId());
            return new LoginResponse(token, refreshToken);
        }
        throw new NotFoundException("User not found");
    }

    @Override
    public AuthRefreshResponse userAuthRefresh(String refreshToken) {
        RefreshToken existingToken = refreshTokenService.getValidRefreshToken(refreshToken);
        Optional<User> user = userRepository.findById(existingToken.getUserId());
        if (user.isEmpty()) {
            throw new SecurityException("User not found");
        }
        String token = jwtTokenProvider.generateToken(user.get().getUsername());
        String newRefreshToken = jwtTokenProvider.generateRefreshToken();
        refreshTokenService.saveNewRefreshToken(newRefreshToken, user.get().getId());
        return new AuthRefreshResponse(token, newRefreshToken);
    }


}
