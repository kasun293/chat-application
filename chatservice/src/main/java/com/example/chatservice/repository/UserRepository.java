package com.example.chatservice.repository;

import com.example.chatservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserNameAndPassword(String userName, String password);

    Optional<User> findByUserName(String userName);

    User findByMobileNumber(String mobileNumber);
}
