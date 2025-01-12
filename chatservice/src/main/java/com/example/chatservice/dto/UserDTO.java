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
    @NonNull
    private String firstName;
    private String lastName;
    private String gender;
    //    private LocalDate birthDate;
    private String userName;
    private String password;
    private String confirmPassword;
    private String displayName;
    private String mobileNumber;
    private ConversationDTO conversationDTO;
    private List<ConversationDTO> conversationDTOList;
}
