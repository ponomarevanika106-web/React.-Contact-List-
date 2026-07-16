import React, { Component } from "react";
import "./App.css";

import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";

class App extends Component {
  state = {
    contacts: [],
    contactForEdit: this.createEmptyContact(),
  };

  createEmptyContact() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));

    this.setState({
      contacts: contacts || [],
    });
  }

  saveToStorage(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  newContact = () => {
    this.setState({
      contactForEdit: this.createEmptyContact(),
    });
  };

  editContact = (id) => {
    const contact = this.state.contacts.find(
      (item) => item.id === id
    );

    if (!contact) return;

    this.setState({
      contactForEdit: { ...contact },
    });
  };

  saveContact = (contact) => {
    if (contact.id) {
      this.updateContact(contact);
    } else {
      this.createContact(contact);
    }
  };

  createContact(contact) {
    const newContact = {
      ...contact,
      id: Date.now(),
    };

    const contacts = [...this.state.contacts, newContact];

    this.saveToStorage(contacts);

    this.setState({
      contacts,
      contactForEdit: this.createEmptyContact(),
    });
  }

  updateContact(contact) {
    this.setState((state) => {
      const contacts = state.contacts.map((item) =>
        item.id === contact.id ? contact : item
      );

      this.saveToStorage(contacts);

      return {
        contacts,
        contactForEdit: { ...contact },
      };
    });
  }

  deleteContact = (id) => {
    this.setState((state) => {
      const contacts = state.contacts.filter(
        (item) => item.id !== id
      );

      this.saveToStorage(contacts);

      return {
        contacts,
        contactForEdit: this.createEmptyContact(),
      };
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="title">Contact List</h1>

        <div className="content">
          <ContactList
            contacts={this.state.contacts}
            editContact={this.editContact}
            deleteContact={this.deleteContact}
          />

          <ContactForm
            contact={this.state.contactForEdit}
            saveContact={this.saveContact}
            deleteContact={this.deleteContact}
            newContact={this.newContact}
          />
        </div>
      </div>
    );
  }
}

export default App;