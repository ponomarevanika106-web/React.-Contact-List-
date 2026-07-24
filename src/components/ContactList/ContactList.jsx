import "./ContactList.css";
import ContactItem from "../ContactItem/ContactItem";

function ContactList({
  contacts,
  editContact,
  deleteContact,
}) {
  return (
    <div className="contact-list">
      <h2>Contacts</h2>

      {contacts.length === 0 ? (
        <p className="empty">No contacts</p>
      ) : (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            editContact={() => editContact(contact)}
            deleteContact={deleteContact}
          />
        ))
      )}
    </div>
  );
}

export default ContactList;