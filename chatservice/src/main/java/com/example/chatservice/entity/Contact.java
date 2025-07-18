package com.example.chatservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Column;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // this is my friend's account user ID
    @ManyToOne
    @JoinColumn(name = "contact_user_id", referencedColumnName = "id")
    private User contactUser;
    private String contactName;
    // this is the contact owner eg: this is me
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany(mappedBy = "contactList")
    private List<Conversation> conversations;
}
