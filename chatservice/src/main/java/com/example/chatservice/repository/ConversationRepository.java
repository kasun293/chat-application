package com.example.chatservice.repository;

import com.example.chatservice.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    List<Conversation> findAllByUserId(Long userId);

    @Query("SELECT DISTINCT c FROM Conversation c JOIN c.contactList cl WHERE c.user.id = :id OR " +
            "cl.contactUser.id = :id")
    List<Conversation> findAllByUser(Long id);
}
