/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getContactList } from "../../../action/contact/action";
import SingleContact from "./SingleContact";

const ContactList = ({ onClickEdit, onClickDelete }) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    // Fetch the list of contacts from the server
    fetchContacts();

    async function fetchContacts() {
      try {
        const response = await getContactList();
        setContacts(response.dataList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
  }, []);

  return (
    <>
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => (
          <SingleContact
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            contact={contact}
            handleConversation={() => {}}
            isSelected={false}
            key={contact.id}
          />
        ))
      ) : (
        <div>No contacts found</div>
      )}
    </>
  );
};

export default ContactList;
