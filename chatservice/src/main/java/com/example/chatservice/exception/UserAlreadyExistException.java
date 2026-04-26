package com.example.chatservice.exception;

import java.io.Serial;

public class UserAlreadyExistException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public UserAlreadyExistException() {

    }
    public UserAlreadyExistException(String message) {
        super(message);
    }
    public UserAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
    public UserAlreadyExistException(Throwable cause) {
        super(cause);
    }
}
