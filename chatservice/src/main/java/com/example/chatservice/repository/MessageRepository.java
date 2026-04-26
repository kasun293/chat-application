package com.example.chatservice.repository;

import com.example.chatservice.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m JOIN m.conversation c where c.id = :id")
    List<Message> findAllByConversationId(@Param("id") Long conversationId);

    @Query("SELECT m FROM Message m JOIN m.conversation c where c.id = :id")
    Page<Message> findAllByConversationIdWithPagination(@Param("id") Long conversationId, Pageable pageable);
}
