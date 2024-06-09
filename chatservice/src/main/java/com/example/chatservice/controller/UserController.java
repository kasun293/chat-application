package com.example.chatservice.controller;

import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody @Validated UserDTO userDTO) {
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
}
