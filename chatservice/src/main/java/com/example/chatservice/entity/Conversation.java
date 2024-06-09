package com.example.chatservice.entity;

import com.example.chatservice.enums.ConversationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String conversationName;
    private String description;

    @Enumerated(EnumType.STRING)
    private ConversationType conversationType;
    private Long createdDate;
    private Long createdBy;

    @OneToMany(mappedBy = "conversation")
    private List<User> users;

}
