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

  // Загрузка контактов
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

  // Двойной клик по контакту
  const onContactDoubleClick = (contact) => {
    setCurrentContact({ ...contact });
  };

  // Новый контакт
  const onAddNewContact = () => {
    setCurrentContact(createEmptyContact());
  };

  // Создание контакта
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

  // Обновление контакта
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

  // Сохранение контакта
  const saveContact = (contact) => {
    if (contact.id) {
      updateContact(contact);
    } else {
      createContact(contact);
    }
  };

  // Удаление контакта
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