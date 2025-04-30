package com.example.chatservice.repository;

import com.example.chatservice.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> getAllByUserId(Long id);
    Contact findByUserIdAndContactUserId(Long userId, Long contactUserId);
}
