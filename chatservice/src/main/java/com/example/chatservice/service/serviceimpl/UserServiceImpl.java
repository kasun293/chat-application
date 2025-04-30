package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.ConversationDTO;
import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.entity.User;
import com.example.chatservice.exception.BadRequestException;
import com.example.chatservice.repository.UserRepository;
import com.example.chatservice.service.ContactService;
import com.example.chatservice.service.ConversationService;
import com.example.chatservice.service.UserService;
import com.example.chatservice.util.ContextUtils;
import com.example.chatservice.util.MapperUtil;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ContextUtils contextUtils;
    private final ContactService contactService;
    private final ConversationService conversationService;

    public UserServiceImpl(UserRepository userRepository, ContextUtils contextUtils, ContactService contactService, ConversationService conversationService) {
        this.userRepository = userRepository;
        this.contextUtils = contextUtils;
        this.contactService = contactService;
        this.conversationService = conversationService;
    }

    @Override
    public UserDTO registerUser(UserDTO userDto) {
//        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        if (!Objects.equals(userDto.getPassword(), userDto.getConfirmPassword())) {
            throw new BadRequestException("passwords mismatch");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        ModelMapper mapper = new ModelMapper();
        User user = mapper.map(userDto, User.class);
        user.setPassword(encoder.encode(userDto.getPassword()));
//        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        return UserDTO.builder()
                .id(user.getId())
                .userName(user.getUsername())
                .firstName(userDto.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

//    @Override
//    public ResponseEntity<UserDTO> loginUser(String username, String password) throws BadRequestException {
//        User user = userRepository.findByUserNameAndPassword(username, password);
//        if (user == null) {
//            throw new BadRequestException("Invalid username or password");
//        }
//        UserDTO userDTO = MapperUtil.map(user, UserDTO.class);
//        return ResponseEntity.ok(userDTO);
//    }

//    @Override
//    public ResponseEntity<UserDTO> saveContact(Long id, List<UserDTO> contacts) {
//        ModelMapper mapper = new ModelMapper();
//        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found for id " + id));
//        userRepository.save(user);
//        return ResponseEntity.ok(UserDTO.builder()
//                        .id(user.getId())
//                        .userName(user.getUsername())
//                .build());
//    }

//    @Override
//    public Boolean deleteContact(Long id) {
//        return null;
//    }
//
//    @Override
//    public ResponseEntity<List<UserDTO>> getAllContacts(Long id) {
//        return null;
//    }

    @Override
    public UserDTO getLoggedInUser() {
        User user = contextUtils.getLoggedInUserEntity();

        return UserDTO.builder()
                .id(user.getId())
                .userName(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .displayName(user.getDisplayName())
                .gender(user.getGender())
                .build();
    }

    @Override
    public List<ContactDTO> getContactsByUserId(Long userId) {
        return contactService.getAllContactsByUserId(userId);
    }

    @Override
    public List<ConversationDTO> getConversationsByUserId(Long userId) {
        return conversationService.getAllConversationsByUserId(userId);
    }
}
