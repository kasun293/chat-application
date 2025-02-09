package com.example.chatservice.exception;

import com.example.chatservice.dto.response.ResponseDTO;
import org.apache.coyote.BadRequestException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.nio.file.AccessDeniedException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({Exception.class, ChangeSetPersister.NotFoundException.class})
    @ResponseBody
    public ResponseDTO<?> handleException(Exception e) {

        ResponseDTO<Object> response = new ResponseDTO<>();
        response.setStatusCode(INTERNAL_SERVER_ERROR.toString());
        response.setStatus(INTERNAL_SERVER_ERROR);
        response.setMessages(Collections.singletonList(e.toString()));
        return response;
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseBody
    public ResponseDTO<?> handleException(BadRequestException e) {
        ResponseDTO<Object> response = new ResponseDTO<>();
        response.setStatusCode(BAD_REQUEST.toString());
        response.setStatus(HttpStatus.BAD_REQUEST);
        response.setMessages(Collections.singletonList(e.getMessage()));
        return response;
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseBody
    public ResponseDTO<?> handleException(BadCredentialsException e) {
        ResponseDTO<Object> response = new ResponseDTO<>();
        response.setStatusCode(BAD_REQUEST.toString());
        response.setStatus(HttpStatus.BAD_REQUEST);
        response.setMessages(Collections.singletonList(e.getMessage()));
        return response;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseDTO<?> handleException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String errorMessage = error.getDefaultMessage();
            String errorField = error.getObjectName();
            errors.put(errorField, errorMessage);
        });
        ResponseDTO<Object> response = new ResponseDTO<>();
        response.setStatusCode(BAD_REQUEST.toString());
        response.setStatus(HttpStatus.BAD_REQUEST);
        response.setPayload(errors);
        return response;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseBody
    public ResponseDTO<?> handleException(IllegalArgumentException e) {
        String errors = e.getMessage();
        ResponseDTO<Object> response = new ResponseDTO<>();
        response.setStatusCode(BAD_REQUEST.toString());
        response.setStatus(HttpStatus.BAD_REQUEST);
        response.setPayload(errors);
        return response;
    }

    @ResponseBody
    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseDTO<?>  handle(AuthorizationDeniedException e) {
        String errors = e.getMessage();
        ResponseDTO<Object> response = new ResponseDTO<>();
        response.setStatusCode(UNAUTHORIZED.toString());
        response.setStatus(HttpStatus.UNAUTHORIZED);
        response.setPayload(errors);
        return response;
    }

    @ResponseBody
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseDTO<?> handle(AccessDeniedException e) {
        String errors = e.getMessage();
        ResponseDTO<Object> response = new ResponseDTO<>();
        response.setStatusCode(UNAUTHORIZED.toString());
        response.setStatus(HttpStatus.UNAUTHORIZED);
        response.setPayload(errors);
        return response;
    }
}
