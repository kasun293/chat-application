package com.example.chatservice.repository;

import com.example.chatservice.entity.Conversation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("SELECT DISTINCT c FROM Conversation c JOIN c.createdBy cb JOIN FETCH c.contactList cl WHERE cb.id = :id OR cl.id = :id")
    List<Conversation> findAllByUserId(@Param("id") Long userId);

    @Query("SELECT DISTINCT c FROM Conversation c JOIN c.createdBy cb JOIN c.contactList cl WHERE cb.id = :id OR cl.id = :id")
    Page<Conversation> findAllByUserIdWithPagination(@Param("id") Long userId, Pageable pageable);

    @Query("SELECT DISTINCT c FROM Conversation c JOIN FETCH c.contactList cl WHERE c.createdBy.id = :id OR " +
            "cl.id = :id")
    List<Conversation> findAllByUser(Long id);

//    @Query("select c from Conversation c join c.contactList cl where c.conversationType = 'INDIVIDUAL' AND cl.id = :userId AND cl.id = :contactId")
//    Conversation findPrivateChatByUserIdAndContactId(@Param("userId") Long userId, @Param("contactId") Long contactId);

@Query(value = "select c.* from conversation_user cu join (select * from conversation_user cu where cu.user_id = :userId) conv2 on conv2.conversation_id = cu.conversation_id " +
        "join conversation c on c.id = cu.conversation_id where cu.user_id = :contactId", nativeQuery = true)
Conversation findPrivateChatByUserIdAndContactId(@Param("userId") Long userId, @Param("contactId") Long contactId);
}
