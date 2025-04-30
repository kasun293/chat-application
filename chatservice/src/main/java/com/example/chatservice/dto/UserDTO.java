package com.example.chatservice.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String gender;
    private String userName;
    private String password;
    private String confirmPassword;
    private String displayName;
    private String mobileNumber;

    private List<ConversationDTO> conversations;

    private List<ContactDTO> contacts;
}
