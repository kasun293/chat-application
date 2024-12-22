package com.example.chatservice.controller;

import com.example.chatservice.dto.AuthRequestDTO;
import com.example.chatservice.dto.JwtAuthResponse;
import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.service.AuthService;
import com.example.chatservice.service.ContactService;
import com.example.chatservice.service.JwtService;
import com.example.chatservice.service.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/users")
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
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(userDTO));
    }

    @GetMapping("/greetings")
    public ResponseEntity<String> greetings() {
        return ResponseEntity.ok("Hello World");
    }

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequestDTO authRequest) {
        return jwtService.generateToken(authRequest.getUsername());
    }

//    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody AuthRequestDTO loginDto) {
        String token = authService.login(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @GetMapping("/logged-in-user")
    public ResponseEntity<?> getLoggedInUser() throws BadRequestException {
        return ResponseEntity.ok(userService.getLoggedInUser());
    }

    @GetMapping("/{id}/contacts")
    public ResponseEntity<?> getContacts(@PathVariable("id") Long id) throws BadRequestException {
        return ResponseEntity.ok(userService.getContactsByUserId(id));
    }

    @GetMapping("/{id}/conversations")
    public ResponseEntity<?> getConversations(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getConversationsByUserId(id));
    }
}
