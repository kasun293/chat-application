/* eslint-disable react/prop-types */
import { useEffect } from "react";
// import { getContactList } from "../../../action/contact/action";
import SingleContact from "./SingleContact";
import { useDispatch, useSelector } from "react-redux";
import { getAllContactList } from "../../../redux/contact/action";

const ContactList = ({ onClickEdit, onClickDelete, handleClickContact }) => {
  // const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contacts);
  useEffect(() => {
    dispatch(getAllContactList());
    // Fetch the list of contacts from the server
    // fetchContacts();

    // async function fetchContacts() {
    //   try {
    //     const response = await getContactList();
    //     // setContacts(response.dataList);
    //   } catch (error) {
    //     console.error("Error fetching contacts:", error);
    //   }
    // }
  }, []);

  return (
    <>
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => (
          <SingleContact
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            contact={contact}
            handleConversation={() => {
              handleClickContact(contact);
            }}
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
