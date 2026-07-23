import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";

const createEmptyContact = () => ({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

function App() {
  const [contacts, setContacts] = useState(() => {
    const data = localStorage.getItem("contacts");
    return data ? JSON.parse(data) : [];
  });

  const [currentContact, setCurrentContact] = useState(
    createEmptyContact()
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onContactDoubleClick = (id) => {
    const contact = contacts.find((item) => item.id === id);

    if (contact) {
      setCurrentContact(contact);
    }
  };

  const onAddNewContact = () => {
    setCurrentContact(createEmptyContact());
  };

  const saveContact = (contact) => {
    if (contact.id) {
      updateContact(contact);
    } else {
      createContact(contact);
    }

    setCurrentContact(createEmptyContact());
  };

  const createContact = (contact) => {
    contact.id = uuidv4();
    
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const updateContact = (contact) => {
    setContacts((prevContacts) =>
      prevContacts.map((item) =>
        item.id === contact.id ? contact : item
      )
    );
  };

  const onDeleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((item) => item.id !== id)
    );

    if (currentContact.id === id) {
      setCurrentContact(createEmptyContact());
    }
  };

  return (
    <div className="container">
      <h1 className="title">Contact List</h1>

      <div className="content">
        <ContactList
          contacts={contacts}
          editContact={onContactDoubleClick}
          deleteContact={onDeleteContact}
        />

        <ContactForm
          contact={currentContact}
          saveContact={saveContact}
          deleteContact={onDeleteContact}
          newContact={onAddNewContact}
        />
      </div>
    </div>
  );
}

export default App;