package com.example.chatservice.entity;

import com.example.chatservice.enums.ConversationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String conversationName;
    private String description;

    @Enumerated(EnumType.STRING)
    private ConversationType conversationType;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdDate;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private User createdBy;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Conversation_User",
            joinColumns = {
                    @JoinColumn(name = "conversation_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "user_id", referencedColumnName = "id")
            }
    )
    private Set<User> contactList;

}
