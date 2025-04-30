package com.example.chatservice.util;

import com.example.chatservice.dto.response.ResponseDTO;
import com.example.chatservice.dto.response.ResponseListDTO;
import com.example.chatservice.enums.ResultStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Calendar;

@Component
public class ServiceUtil {


    public static Long timeStampGenerator() {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTimeInMillis();
    }

    public static ResponseListDTO<?> updateResponse(ResponseListDTO<?> response) {
        response.setResultStatus(ResultStatus.SUCCESSFUL);
        response.setHttpStatus(HttpStatus.OK);
        response.setHttpCode(response.getHttpStatus().toString());
        return response;
    }

    public static ResponseDTO<?> updateResponse(ResponseDTO<?> response) {
        response.setResultStatus(ResultStatus.SUCCESSFUL);
        response.setHttpStatus(HttpStatus.OK);
        response.setHttpCode(response.getHttpStatus().toString());
        return response;
    }
}
