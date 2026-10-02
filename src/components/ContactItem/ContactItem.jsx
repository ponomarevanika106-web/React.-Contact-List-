import { useDispatch } from "react-redux";
import {
  removeContact,
  setCurrentContact,
} from "../../store/contactsSlice";
import "./ContactItem.css";

export default function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setCurrentContact(contact));
  };

  const onDelete = (e) => {
    e.stopPropagation();
    dispatch(removeContact(contact.id));
  };

  return (
    <div
      className="contact-item"
      onDoubleClick={onEdit}
    >
      <div className="contact-name">
        {contact.firstName} {contact.lastName}
      </div>

      <button
        className="delete-btn"
        type="button"
        onClick={onDelete}
      >
        ✕
      </button>
    </div>
  );
}