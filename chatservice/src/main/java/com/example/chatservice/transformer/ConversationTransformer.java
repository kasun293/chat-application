package com.example.chatservice.transformer;

import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.entity.Conversation;
import com.example.chatservice.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ConversationTransformer {

    private final ContactTransformer contactTransformer;

    public ConversationDTO toDTO(Conversation conversation) {
        if (conversation == null) {
            return null;
        }
        return ConversationDTO.builder()
                .id(conversation.getId())
                .createdBy(conversation.getCreatedBy().getId())
                .creatorName(conversation.getCreatedBy().getDisplayName())
                .contacts(contactTransformer.toDTOList(conversation.getContactList()))
                .createdDate(DateUtil.getIso8601Pattern(conversation.getCreatedDate()))
                .description(conversation.getDescription())
                .conversationName(conversation.getConversationName())
                .conversationType(conversation.getConversationType())
                .build();
    }

    public List<ConversationDTO> toDTOList(List<Conversation> conversations) {
        return conversations.stream().map(this::toDTO).toList();
    }
}
