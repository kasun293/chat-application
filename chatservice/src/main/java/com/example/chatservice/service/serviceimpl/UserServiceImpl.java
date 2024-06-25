package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.entity.User;
import com.example.chatservice.repository.UserRepository;
import com.example.chatservice.service.UserService;
import com.example.chatservice.util.ContextUtils;
import com.example.chatservice.util.MapperUtil;
import jakarta.persistence.EntityNotFoundException;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ContextUtils contextUtils;

    public UserServiceImpl(UserRepository userRepository, ContextUtils contextUtils) {
        this.userRepository = userRepository;
        this.contextUtils = contextUtils;
    }

    @Override
    public ResponseEntity<UserDTO> registerUser(UserDTO userDto) throws BadRequestException {
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
        return ResponseEntity.ok(UserDTO.builder()
                        .id(user.getId())
                        .userName(user.getUsername())
                        .firstName(userDto.getFirstName())
                        .lastName(user.getLastName())
                .build());
    }

    @Override
    public ResponseEntity<UserDTO> loginUser(String username, String password) throws BadRequestException {
        User user = userRepository.findByUserNameAndPassword(username, password);
        if (user == null) {
            throw new BadRequestException("Invalid username or password");
        }
        UserDTO userDTO = MapperUtil.map(user, UserDTO.class);
        return ResponseEntity.ok(userDTO);
    }

    @Override
    public ResponseEntity<UserDTO> saveContact(Long id, List<UserDTO> contacts) {
        ModelMapper mapper = new ModelMapper();
        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found for id " + id));
        userRepository.save(user);
        return ResponseEntity.ok(UserDTO.builder()
                        .id(user.getId())
                        .userName(user.getUsername())
                .build());
    }

    @Override
    public Boolean deleteContact(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<List<UserDTO>> getAllContacts(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<UserDTO> getLoggedInUser() throws BadRequestException {
        User user = contextUtils.getLoggedInUserEntity();
        return ResponseEntity.ok(MapperUtil.map(user, UserDTO.class));
    }
}
