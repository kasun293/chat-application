package com.example.chatservice.service.serviceimpl;

import com.example.chatservice.dto.AddContactRequest;
import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.dto.ContactUpdateRequest;
import com.example.chatservice.dto.response.ResponseListDTO;
import com.example.chatservice.entity.Contact;
import com.example.chatservice.entity.User;
import com.example.chatservice.exception.BadRequestException;
import com.example.chatservice.exception.NotFoundException;
import com.example.chatservice.repository.ContactRepository;
import com.example.chatservice.repository.UserRepository;
import com.example.chatservice.service.ContactService;
import com.example.chatservice.util.ContextUtils;
import com.example.chatservice.util.MapperUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public ContactDTO updateContact(Long id, ContactUpdateRequest request) {
        if (!contactRepository.existsById(id)) {
            throw new NotFoundException("Contact not found with id " + id);
        }
        Contact contact = contactRepository.findById(id).get();
        contact.setContactName(request.getDisplayName());
        contactRepository.save(contact);
        return MapperUtil.map(request,ContactDTO.class);
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
    public List<ContactDTO> getAllContactsByUser() {
        User user = contextUtils.getLoggedInUserEntity();
        List<Contact> contacts = contactRepository.getAllByUserId(user.getId());
        List<ContactDTO> contactDTOList = new ArrayList<>();
        for (Contact contact : contacts) {
            ContactDTO contactDTO = ContactDTO.builder()
                    .id(contact.getId())
                    .displayName(contact.getContactName())
                    .phone(contact.getContactUser().getUsername())
                    .build();
            contactDTOList.add(contactDTO);
        }
        return contactDTOList;
    }

    @Override
    public ResponseListDTO<ContactDTO> getAllContactsByLoggedInUser(Pageable pageable) {
        User user = contextUtils.getLoggedInUserEntity();
        List<ContactDTO> contactDTOs = new ArrayList<>();
        Page<Contact> contacts = contactRepository.getAllByUserId(user.getId(), pageable);
        for (Contact contact : contacts) {
            ContactDTO contactDTO = ContactDTO.builder()
                    .id(contact.getId())
                    .displayName(contact.getContactName())
                    .phone(contact.getContactUser().getUsername())
                    .build();
            contactDTOs.add(contactDTO);
        }
        return new ResponseListDTO<>(contactDTOs, contacts.getTotalPages(), contacts.getTotalElements(), contacts.isLast(), contacts.getSize(), contacts.getNumber(), contacts.getSort(), contacts.getNumberOfElements());
    }

    @Override
    public Long getUserOfContact(Long id) {
        return contactRepository.findUserIdByContactId(id);
    }

    @Override
    public ContactDTO addContact(AddContactRequest request) {
        Optional<User> contact = userRepository.findByUserName(request.getPhone());
        if (contact.isEmpty()) {
            throw new NotFoundException("User not found with the phone number: " + request.getPhone());
        }
        User user = contextUtils.getLoggedInUserEntity();
        Contact existingContact = contactRepository.findByUserIdAndContactUserId(user.getId(), contact.get().getId());
        if (existingContact != null) {
            throw new BadRequestException("Contact already exists with the phone number: " + request.getPhone());
        }
        Contact contactToSave = MapperUtil.map(request, Contact.class);
        contactToSave.setUser(user);
        contactToSave.setContactUser(contact.get());
        contactRepository.save(contactToSave);
        return MapperUtil.map(contactToSave, ContactDTO.class);
    }
}
