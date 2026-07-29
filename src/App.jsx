import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import api from "./api/contacts-service";

const createEmptyContact = () => ({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

function App() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(
    createEmptyContact()
  );

  useEffect(() => {
    api
      .get("/")
      .then(({ data }) => {
        setContacts(data || []);
      })
      .catch((error) => {
        console.error(
          "Ошибка загрузки контактов:",
          error
        );
      });
  }, []);

  const onContactDoubleClick = (contact) => {
    setCurrentContact({ ...contact });
  };

  const onAddNewContact = () => {
    setCurrentContact(createEmptyContact());
  };

  const createContact = (contact) => {
    api
      .post("/", {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
      })
      .then(({ data }) => {
        setContacts((prevContacts) => [
          ...prevContacts,
          data,
        ]);

        setCurrentContact(createEmptyContact());
      })
      .catch((error) => {
        console.error(
          "Ошибка создания контакта:",
          error
        );
      });
  };

  
  const updateContact = (contact) => {
    api
      .put(`/${contact.id}`, contact)
      .then(({ data }) => {
        setContacts((prevContacts) =>
          prevContacts.map((item) =>
            item.id === data.id ? data : item
          )
        );

        setCurrentContact(data);
      })
      .catch((error) => {
        console.error(
          "Ошибка обновления контакта:",
          error
        );
      });
  };

  const saveContact = (contact) => {
    if (contact.id) {
      updateContact(contact);
    } else {
      createContact(contact);
    }
  };

  const onDeleteContact = (id) => {
    api
      .delete(`/${id}`)
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.filter(
            (item) => item.id !== id
          )
        );

        if (currentContact.id === id) {
          setCurrentContact(createEmptyContact());
        }
      })
      .catch((error) => {
        console.error(
          "Ошибка удаления контакта:",
          error
        );
      });
  };

  return (
    <div className="container">
      <h1 className="title">
        Contact List
      </h1>

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