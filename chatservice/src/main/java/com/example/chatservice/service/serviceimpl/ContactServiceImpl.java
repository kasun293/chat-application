package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.entity.Contact;
import com.example.chatservice.entity.User;
import com.example.chatservice.exception.NotFoundException;
import com.example.chatservice.repository.ContactRepository;
import com.example.chatservice.repository.UserRepository;
import com.example.chatservice.service.ContactService;
import com.example.chatservice.util.ContextUtils;
import com.example.chatservice.util.MapperUtil;
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

//    @Override
//    public ContactDTO addContact(ContactDTO contactDTO) {
//        return null;
//    }

    @Override
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        if (!contactRepository.existsById(id)) {
            throw new NotFoundException("Contact not found with id " + id);
        }
        contactRepository.save(MapperUtil.map(contactDTO, Contact.class));
        return contactDTO;
    }

    @Override
    public Boolean deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new NotFoundException("Contact not found with id " + id);
        }
        contactRepository.deleteById(id);
        return true;
    }

    @Override
    public List<ContactDTO> getAllContactsByUserId(Long id) {
        List<Contact> contacts = contactRepository.getAllByUserId(id);
        return MapperUtil.mapAll(contacts, ContactDTO.class);
    }

    @Override
    public ContactDTO addContact(ContactDTO contactDTO) {
        User contact = userRepository.findByMobileNumber(contactDTO.getPhone());
        if (contact == null) {
            throw new NotFoundException("User not found with the phone number: " + contactDTO.getPhone());
        }
        contactDTO.setContactUserId(contact.getId());
        User user = contextUtils.getLoggedInUserEntity();
//        contactDTO.setUserDTO(MapperUtil.map(user, UserDTO.class));
        Contact contactToSave = MapperUtil.map(contactDTO, Contact.class);
        contactToSave.setUser(user);
        contactRepository.save(contactToSave);
        return MapperUtil.map(contactToSave, ContactDTO.class);
    }
}
