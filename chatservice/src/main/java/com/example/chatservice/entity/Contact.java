package com.example.chatservice.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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

}
