import { useSelector } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import "./ContactList.css";

export default function ContactList() {
  const contacts = useSelector((state) => state.contacts.contacts);

  return (
    <div className="contact-list">
      <h2 className="list-title">Contacts</h2>

      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
          />
        ))
      ) : (
        <div className="empty">No contacts</div>
      )}
    </div>
  );
}