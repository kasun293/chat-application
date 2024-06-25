package com.example.chatservice.service.serviceimpl;

import ch.qos.logback.core.util.ContextUtil;
import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.entity.Contact;
import com.example.chatservice.entity.User;
import com.example.chatservice.repository.ContactRepository;
import com.example.chatservice.repository.UserRepository;
import com.example.chatservice.service.ContactService;
import com.example.chatservice.util.ContextUtils;
import com.example.chatservice.util.MapperUtil;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    private final ContextUtils contextUtils;

    public ContactServiceImpl(ContactRepository contactRepository, UserRepository userRepository, ContextUtils contextUtils) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
        this.contextUtils = contextUtils;
    }

    @Override
    public List<ContactDTO> getAllContactsByUserId(Long id) {
        List<Contact> contacts = contactRepository.getAllByUserId(id);
        return MapperUtil.mapAll(contacts, ContactDTO.class);
    }

    @Override
    public ContactDTO createContact(ContactDTO contactDTO) throws BadRequestException {


        if (contactDTO.getPhone() == null || contactDTO.getPhone().isEmpty()) {
            throw new IllegalArgumentException("Phone cannot be empty");
        }
        if (contactDTO.getName() == null || contactDTO.getName().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        User contact = userRepository.findByMobileNumber(contactDTO.getPhone());
        if (contact == null) {
            throw new IllegalArgumentException("User not found with the phone number");
        }
        contactDTO.setUserId(contact.getId());
        User user = contextUtils.getLoggedInUserEntity();
        contactDTO.setUserDTO(MapperUtil.map(user, UserDTO.class));
        Contact contactToSave = contactRepository.save(MapperUtil.map(contactDTO, Contact.class));
        return MapperUtil.map(contactToSave, ContactDTO.class);
    }
}
