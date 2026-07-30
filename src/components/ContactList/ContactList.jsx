import "./ContactList.css";
import ContactItem from "../ContactItem/ContactItem";

function ContactList({
  contacts = [],
  editContact,
  deleteContact,
}) {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          editContact={editContact}
          deleteContact={deleteContact}
        />
      ))}
    </div>
  );
}

export default ContactList;