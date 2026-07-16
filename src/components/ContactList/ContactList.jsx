import React, { Component } from "react";
import "./ContactList.css";

import ContactItem from "../ContactItem/ContactItem";

class ContactList extends Component {
  render() {
    const { contacts, editContact, deleteContact } = this.props;

    return (
      <div className="contact-list">
        <h2 className="list-title">Contacts</h2>

        {contacts.length === 0 ? (
          <p className="empty">No contacts</p>
        ) : (
          contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              editContact={editContact}
              deleteContact={deleteContact}
            />
          ))
        )}
      </div>
    );
  }
}

export default ContactList;