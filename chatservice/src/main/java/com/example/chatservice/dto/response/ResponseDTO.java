package com.example.chatservice.dto.response;


import com.example.chatservice.enums.ResultStatus;
import org.springframework.http.HttpStatus;


public class ResponseDTO<T> extends ResultsDTO {

    private T payload;

    public static ResponseDTO<?> response(ResponseDTO<?> response) {
        response.setResultStatus(ResultStatus.SUCCESSFUL);
        response.setHttpStatus(HttpStatus.OK);
        response.setHttpCode(response.getHttpStatus().toString());
        return response;
    }

    public static ResponseDTO<?> response(ResponseDTO<?> response, HttpStatus httpStatus) {
        response.setResultStatus(ResultStatus.SUCCESSFUL);
        if (httpStatus == null) {
            response.setHttpStatus(HttpStatus.OK);
        } else {
            response.setHttpStatus(httpStatus);
        }
        response.setHttpCode(response.getHttpStatus().toString());
        return response;
    }
}
