import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import api from "./api/contacts-service";

import {
  setContacts,
  addContact,
  updateContact,
  deleteContact,
  setCurrentContact,
} from "./store/actions/contactActions";

import { createEmptyContact } from "./constants/constants";

function App() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts);
  const currentContact = useSelector(
    (state) => state.currentContact
  );

  useEffect(() => {
    api
      .get("/")
      .then(({ data }) => {
        dispatch(setContacts(data));
      })
      .catch(console.error);
  }, [dispatch]);

  const onContactDoubleClick = (contact) => {
    dispatch(setCurrentContact({ ...contact }));
  };

  const onAddNewContact = () => {
    dispatch(setCurrentContact(createEmptyContact()));
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
        dispatch(addContact(data));
        dispatch(setCurrentContact(createEmptyContact()));
      })
      .catch(console.error);
  };

  const changeContact = (contact) => {
    api
      .put(`/${contact.id}`, contact)
      .then(({ data }) => {
        dispatch(updateContact(data));
        dispatch(setCurrentContact({ ...data }));
      })
      .catch(console.error);
  };

  const onSaveContact = (contact) => {
    if (contact.id) {
      changeContact(contact);
    } else {
      createContact(contact);
    }
  };

  const onDeleteContact = (id) => {
    api
      .delete(`/${id}`)
      .then(() => {
        dispatch(deleteContact(id));
        dispatch(setCurrentContact(createEmptyContact()));
      })
      .catch(console.error);
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
          saveContact={onSaveContact}
          deleteContact={onDeleteContact}
          newContact={onAddNewContact}
        />
      </div>
    </div>
  );
}

export default App;