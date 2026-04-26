package com.example.chatservice.util;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

@Component
public class DateUtil {

    public static final String ISO_8601_PATTERN = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    public static final String READABLE_PATTERN = "yyyy-MM-dd HH:mm:ss z";
    public static final String UTC = "UTC";


    public static Long timeStampGenerator() {
        Instant instant = Instant.now();
        return instant.toEpochMilli();
    }

    public static Date dateGenerator() {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTime();
    }

    public static String getReadablePattern(Instant instant) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(READABLE_PATTERN);
        return formatter.format(instant);
    }

    public static String getIso8601Pattern(Instant instant) {
        ZonedDateTime zonedDateTime = instant.atZone(ZoneId.of(UTC));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(ISO_8601_PATTERN);
        return zonedDateTime.format(formatter);
    }
}
