package com.example.chatservice.controller;

import com.example.chatservice.dto.AuthRequestDTO;
import com.example.chatservice.dto.JwtAuthResponse;
import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.service.AuthService;
import com.example.chatservice.service.ContactService;
import com.example.chatservice.service.JwtService;
import com.example.chatservice.service.UserService;
import com.example.chatservice.util.ServiceUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthService authService;
    private final ContactService contactService;

    public UserController(UserService userService, JwtService jwtService, AuthService authService, ContactService contactService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authService = authService;
        this.contactService = contactService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(userDTO));
    }

    @GetMapping("/greetings")
    public String greetings() {
        return "hello";
    }

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequestDTO authRequest) {
        return jwtService.generateToken(authRequest.getUsername());
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody AuthRequestDTO loginDto) {
        String token = authService.login(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @GetMapping("/logged-in-user")
    public ResponseDTO<?> getLoggedInUser() {
        ResponseDTO<UserDTO> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(userService.getLoggedInUser());
        return ServiceUtil.updateResponse(responseDTO);
    }

}
