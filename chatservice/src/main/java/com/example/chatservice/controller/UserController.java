package com.example.chatservice.controller;

import com.example.chatservice.dto.AuthRequestDTO;
import com.example.chatservice.dto.JwtAuthResponse;
import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.service.AuthService;
import com.example.chatservice.service.JwtService;
import com.example.chatservice.service.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthService authService;

    public UserController(UserService userService, JwtService jwtService, AuthService authService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) throws BadRequestException {
        return userService.registerUser(userDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> addContacts(@PathVariable Long id, @RequestBody List<UserDTO> contacts) {
        return userService.saveContact(id,contacts);
    }

    @GetMapping("/greetings")
    public ResponseEntity<String> greetings() {
        return ResponseEntity.ok("Hello World");
    }

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequestDTO authRequest) {
        return jwtService.generateToken(authRequest.getUsername());
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody AuthRequestDTO loginDto){
        String token = authService.login(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @GetMapping("/logged-in-user")
    public ResponseEntity<?> getLoggedInUser() throws BadRequestException {
        return userService.getLoggedInUser();
    }
}
