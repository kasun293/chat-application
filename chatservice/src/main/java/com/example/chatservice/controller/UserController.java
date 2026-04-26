package com.example.chatservice.controller;

import com.example.chatservice.dto.*;
import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.exception.error.ApiError;
import com.example.chatservice.service.AuthService;
import com.example.chatservice.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @Operation(
            operationId = "registerUser",
            summary = "Register user",
            description = "Register a new user",
            tags = {"Users"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully", content = @Content(schema = @Schema(implementation = ResponseEntity.class))),
            @ApiResponse(responseCode = "400", description = "Invalid user details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Contact not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/register")
    public ResponseDTO<UserResponse> registerUser(@RequestBody @Valid UserRegistrationRequest userDTO) {
        ResponseDTO<UserResponse> responseDTO = new ResponseDTO<>();
        UserResponse response = userService.registerUser(userDTO);
        responseDTO.setPayload(response);
        return responseDTO.updateResponse(responseDTO);
    }

    @Operation(
            operationId = "greetings",
            summary = "Greetings",
            description = "Greetings",
            tags = {"Greetings"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Greetings"),
    })
    @GetMapping("/greetings")
    public String greetings() {
        return "hello";
    }

    @Operation(
            operationId = "loginUser",
            summary = "Login user",
            description = "Login a registered user",
            tags = {"Users"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid user details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Contact not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO<JwtAuthResponse> login(@RequestBody @Valid AuthRequestDTO loginDto, HttpServletResponse servletResponse) {
        LoginResponse loginResponse = authService.login(loginDto);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", loginResponse.getRefreshToken())
                .httpOnly(true)
                .secure(false)    // Set to TRUE in production (HTTPS), FALSE for localhost HTTP
                .path("/")        // Using "/" ensures the cookie is sent to all endpoints
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")  // "Lax" is better for localhost cross-port requests
                .build();

        servletResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        ResponseDTO<JwtAuthResponse> response = new ResponseDTO<>();
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(loginResponse.getAccessToken());
        response.setPayload(jwtAuthResponse);
        return response.updateResponse(response);
    }

    @Operation(
            operationId = "authRefresh",
            summary = "Authentication refresh",
            description = "Refresh user authentication",
            tags = {"Users"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User authentication refreshed successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid refresh token provided", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Refresh token not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @PostMapping("/auth/refresh")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO<JwtAuthResponse> authRefresh(@CookieValue(name = "refreshToken") String refreshToken, HttpServletResponse servletResponse) {
        AuthRefreshResponse authRefreshResponse = authService.userAuthRefresh(refreshToken);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", authRefreshResponse.getRefreshToken())
                .httpOnly(true)
                .secure(false)    // Set to TRUE in production (HTTPS), FALSE for localhost HTTP
                .path("/")        // Using "/" ensures the cookie is sent to all endpoints
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")  // "Lax" is better for localhost cross-port requests
                .build();

        servletResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        ResponseDTO<JwtAuthResponse> response = new ResponseDTO<>();
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(authRefreshResponse.getAccessToken());
        response.setPayload(jwtAuthResponse);
        return response.updateResponse(response);
    }

    @Operation(
            operationId = "getLoggedInUser",
            summary = "Get logged in user",
            description = "Get logged in user by token",
            tags = {"Users"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logged in user returned successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid user details supplied", content = @Content(schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "404", description = "Contact not found", content = @Content(schema = @Schema(implementation = ApiError.class))),
    })
    @GetMapping("/logged-in-user")
    public ResponseDTO<UserResponse> getLoggedInUser() {
        ResponseDTO<UserResponse> responseDTO = new ResponseDTO<>();
        responseDTO.setPayload(userService.getLoggedInUser());
        return responseDTO.updateResponse(responseDTO);
    }

}
