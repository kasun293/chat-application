package com.example.chatservice.exception;

import com.example.chatservice.dto.response.ApiResponseDto;
import com.example.chatservice.exception.error.ApiError;
import org.apache.coyote.BadRequestException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.nio.file.AccessDeniedException;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({Exception.class, ChangeSetPersister.NotFoundException.class})
    @ResponseBody
    public ResponseEntity<?> handleException(Exception e) {
        ApiError apiError = new ApiError(INTERNAL_SERVER_ERROR, e.getMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseBody
    public ResponseEntity<?> handleException(BadRequestException e) {
        ApiError apiError = new ApiError(BAD_REQUEST, e.getMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseBody
    public ResponseEntity<?> handleException(BadCredentialsException e) {
        ApiError apiError = new ApiError(UNAUTHORIZED, e.getMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseEntity<?> handleException(MethodArgumentNotValidException e) {
        ApiError apiError = new ApiError(BAD_REQUEST, e.getMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseBody
    public ResponseEntity<?> handleException(IllegalArgumentException e) {
        ApiError apiError = new ApiError(BAD_REQUEST, e.getMessage());
        return buildResponseEntity(apiError);
    }

    @ResponseBody
    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<?> handle(AuthorizationDeniedException e) {
        ApiError apiError = new ApiError(UNAUTHORIZED, e.getMessage());
        return buildResponseEntity(apiError);
    }

    @ResponseBody
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handle(AccessDeniedException e) {
        ApiError apiError = new ApiError(UNAUTHORIZED, e.getMessage());
        return buildResponseEntity(apiError);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        ApiResponseDto data = new ApiResponseDto(false, apiError);
        return ResponseEntity.status(apiError.getStatus()).body(data);
    }
}
