package com.example.chatservice.dto.response;


import com.example.chatservice.enums.ResultStatus;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
public class ResponseDTO<T> extends ResultsDTO {

    private List<String> messages;
    private HttpStatus status;
    private String statusCode;
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
