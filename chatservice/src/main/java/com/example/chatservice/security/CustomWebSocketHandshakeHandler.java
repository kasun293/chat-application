package com.example.chatservice.security;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

import static com.example.chatservice.security.JwtTokenProvider.getTokenFromRequest;

@RequiredArgsConstructor
public class CustomWebSocketHandshakeHandler extends DefaultHandshakeHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        String token = getTokenFromRequest((HttpServletRequest) request);
        if (token != null) {
            if (jwtTokenProvider.validateToken(token)) {

            }
        }
        return super.determineUser(request, wsHandler, attributes);
    }
}
