package com.example.chatservice.repository;

import com.example.chatservice.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> getAllByUserId(Long id);
    Page<Contact> getAllByUserId(Long id, Pageable pageable);
    Contact findByUserIdAndContactUserId(Long userId, Long contactUserId);

    @Query("select c from Contact c join c.contactUser u where u.userName = :number")
    Contact findByMobileNumber(@Param("number") String number);

    @Query("SELECT cu.id FROM Contact c JOIN c.contactUser cu WHERE c.id = :id")
    Long findUserIdByContactId(@Param("id") Long id);
}
