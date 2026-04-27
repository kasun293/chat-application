package com.example.chatservice.service;

import com.example.chatservice.config.TestContainerConfig;
import com.example.chatservice.dto.UserRegistrationRequest;
import com.example.chatservice.dto.UserResponse;
import com.example.chatservice.entity.User;
import com.example.chatservice.exception.BadRequestException;
import com.example.chatservice.exception.UserAlreadyExistException;
import com.example.chatservice.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.mysql.MySQLContainer;


@SpringBootTest
@Testcontainers
@Import(TestContainerConfig.class)
public class UserServiceTest {


    @Autowired
    MySQLContainer mySQLContainer;
    @Autowired
    private  UserService userService;
    @Autowired
    private UserRepository userRepository;
//    private User savedUser;

    @BeforeEach
    void setUpDbData() {
        User user = new User();
        user.setUserName("user1");
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode("password1"));
        user.setDisplayName("user1");
//        savedUser = userRepository.save(user);
        userRepository.save(user);
    }

//    @AfterEach
//    void tearDownDbData() {
//        userRepository.delete(savedUser);
//    }

    @Test
    @DisplayName("""
            GIVEN: username exist in the db
            WHEN: register user is called
            THEN: user is not registered
            AND: user already exist exception throws
            """)
    void test1() {
        UserRegistrationRequest user = new  UserRegistrationRequest();
        user.setUserName("user1");
        Assertions.assertThrows(UserAlreadyExistException.class, () -> userService.registerUser(user));

    }

    @Test
    @DisplayName("""
            GIVEN: username not exist in the db
            WHEN: register user is called
            THEN: user is not registered
            AND: passwords mismatch
            """)
    void test2() {
        UserRegistrationRequest user = new  UserRegistrationRequest();
        user.setUserName("user2");
        user.setPassword("password1");
        user.setConfirmPassword("password2");
        Assertions.assertThrows(BadRequestException.class, () -> userService.registerUser(user));

    }

    @Test
    @DisplayName("""
            GIVEN: username not exist in the db
            WHEN: register user is called
            THEN: user is not registered
            AND: user get registered successfully
            """)
    void test3() {
        UserRegistrationRequest user = new  UserRegistrationRequest();
        user.setDisplayName("user display name");
        user.setUserName("user2");
        user.setPassword("password1");
        user.setConfirmPassword("password1");
        UserResponse userResponse = userService.registerUser(user);
        Assertions.assertNotNull(userResponse);
        Assertions.assertNotNull(userResponse.getId());
        Assertions.assertEquals(user.getDisplayName(), userResponse.getDisplayName());
    }

}
