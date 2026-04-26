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
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Instant expiryDate;

    @Column(nullable = false)
    @CreatedDate
    private Instant createdDate;

    @Column(nullable = false)
    private boolean isRevoked;
}
