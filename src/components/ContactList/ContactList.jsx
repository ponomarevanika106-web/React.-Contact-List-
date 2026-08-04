import { useSelector } from "react-redux";
import "./ContactList.css";
import ContactItem from "../ContactItem/ContactItem";

function ContactList() {
  const contacts = useSelector((state) => state.contacts);

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
        />
      ))}
    </div>
  );
}

export default ContactList;