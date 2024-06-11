package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.entity.User;
import com.example.chatservice.repository.UserRepository;
import com.example.chatservice.service.UserService;
import com.example.chatservice.util.MapperUtil;
import jakarta.persistence.EntityNotFoundException;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<UserDTO> registerUser(UserDTO userDto) {
//        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        ModelMapper mapper = new ModelMapper();
        User user = mapper.map(userDto, User.class);
//        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(UserDTO.builder()
                        .id(user.getId())
                        .userName(user.getUserName())
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
        Set<User> cantactsToAdd = new HashSet<>();
        for (UserDTO userDto : contacts) {
            User contact = mapper.map(userDto, User.class);
            cantactsToAdd.add(contact);
        }
        user.setContacts(cantactsToAdd);
        userRepository.save(user);
        return ResponseEntity.ok(UserDTO.builder()
                        .id(user.getId())
                        .userName(user.getUserName())
                        .contactList(user.getContacts().stream().map(
                                contact ->
                                UserDTO.builder()
                                        .id(contact.getId())
                                        .userName(contact.getUserName())
                                        .build()
                                ).collect(Collectors.toSet()))
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
}
