package com.example.chatservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDTO {

    private Long id;
    private String content;
    private Long senderId;
    private String senderName;
    private Instant timeStamp;
    private Long conversationId;
}
