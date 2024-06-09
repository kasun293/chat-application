package com.example.chatservice.util;

import org.springframework.stereotype.Component;

import java.util.Calendar;

@Component
public class ServiceUtil {


    public static Long timeStampGenerator() {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTimeInMillis();
    }
}
