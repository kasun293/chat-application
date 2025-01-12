package com.example.chatservice.util;

import com.example.chatservice.entity.User;
import com.example.chatservice.exception.BadRequestException;
import com.example.chatservice.exception.NotFoundException;
import com.example.chatservice.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class ContextUtils {


    private static final Logger LOG = LogManager.getLogger(ContextUtils.class);

    private final UserRepository userRepository;

    public ContextUtils(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getLoggedInUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        this.verifyContext(context);
        return ((UserDetails) context.getAuthentication().getPrincipal()).getUsername();
    }

    public User getLoggedInUserEntity() {
        SecurityContext context = SecurityContextHolder.getContext();
        this.verifyContext(context);
        return userRepository.findByUserName(((UserDetails) context.getAuthentication().getPrincipal()).getUsername())
                .orElseThrow(() -> new NotFoundException("Logged in user not found"));
    }


    private void verifyContext(SecurityContext context) {

        if (context == null) {
            throw new BadRequestException("Could not retrieve the security context.");
        }
        if (context.getAuthentication() == null || !context.getAuthentication().isAuthenticated()) {
            throw new BadRequestException("User is not logged");
        }
        if (context.getAuthentication().getPrincipal() == null) {
            throw new BadRequestException("Could not retrieve principal from the security context.");
        }
    }
}
