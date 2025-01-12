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

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinTable(name = "Conversation_Contact",
            joinColumns = {
                    @JoinColumn(name = "conversation_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "contact_id", referencedColumnName = "id")
            }
    )
    private List<Contact> contactList;

}
