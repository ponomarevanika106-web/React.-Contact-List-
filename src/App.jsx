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
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(createEmptyContact());
  
  useEffect(() => {
    const downloadedContacts = JSON.parse(
      localStorage.getItem("contacts")
    );

    setContacts(downloadedContacts || []);
  }, []);

  const saveToStorage = (updatedContacts) => {
    localStorage.setItem(
      "contacts",
      JSON.stringify(updatedContacts)
    );
  };

  const onContactDoubleClick = (contact) => {
    setCurrentContact(contact);
  };

  const onAddNewContact = () => {
    setCurrentContact(createEmptyContact());
  };

  const createContact = (contact) => {
    const newContact = {
      ...contact,
      id: uuidv4(),
    };

    const updatedContacts = [
      ...contacts,
      newContact,
    ];

    setContacts(updatedContacts);
    saveToStorage(updatedContacts);
  };

  const updateContact = (contact) => {
    const updatedContacts = contacts.map((item) =>
      item.id === contact.id ? contact : item
    );

    setContacts(updatedContacts);
    saveToStorage(updatedContacts);

    setCurrentContact(contact);
  };

  const saveContact = (contact) => {
    if (contact.id) {
      updateContact(contact);
    } else {
      createContact(contact);
      setCurrentContact(createEmptyContact());
    }
  };

  const onDeleteContact = (id) => {
    const updatedContacts = contacts.filter(
      (item) => item.id !== id
    );

    setContacts(updatedContacts);
    saveToStorage(updatedContacts);

    setCurrentContact(createEmptyContact());
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