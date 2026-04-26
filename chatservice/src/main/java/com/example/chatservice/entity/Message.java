package com.example.chatservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Long senderId;

    @Column(nullable = false)
    private String senderName;

//    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant timeStamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id", referencedColumnName = "id")
    private Conversation conversation;
}
