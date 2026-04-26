package com.example.chatservice.transformer;

import com.example.chatservice.dto.AddContactRequest;
import com.example.chatservice.dto.ContactDTO;
import com.example.chatservice.entity.Contact;
import com.example.chatservice.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class ContactTransformer {

    public ContactDTO toDTO(Contact contact) {
        if (contact == null) {
            return null;
        }
        return ContactDTO.builder()
                .id(contact.getId())
                .phone(contact.getUser().getUsername())
                .displayName(contact.getContactName())
                .build();
    }

    public ContactDTO toDto(User user) {
        if (user == null) {
            return null;
        }
        return ContactDTO.builder()
                .id(user.getId())
                .displayName(user.getDisplayName())
                .phone(user.getUsername())
                .build();
    }

    public List<ContactDTO> toDTOList(Set<User> contacts) {
        return contacts.stream().map(this::toDto).toList();
    }

    public Contact toEntity(AddContactRequest request) {
        if (request == null) {
            return null;
        }
        return Contact.builder()
                .contactName(request.getDisplayName())
                .build();
    }

    public List<ContactDTO> toDTOList(List<Contact> contactList) {
        return contactList.stream().map(this::toDTO).toList();
    }
}
