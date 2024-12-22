package com.example.chatservice.dto;

import com.example.chatservice.entity.User;
import com.example.chatservice.enums.ConversationType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConversationDTO {

    private Long id;
    private String conversationName;
    private String description;
    @Enumerated(EnumType.STRING)
    private ConversationType conversationType;
    private Long createdDate;
    private Long createdBy;
    private List<ContactDTO> contacts;
}
