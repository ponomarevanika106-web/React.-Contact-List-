import { useDispatch } from "react-redux";
import "./ContactItem.css";

import {
  deleteContact,
  setCurrentContact,
} from "../../store/actions/contactActions";

import { createEmptyContact } from "../../constants/constants";

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const onEditContact = () => {
    dispatch(setCurrentContact(contact));
  };

  const onDeleteClick = (e) => {
    e.stopPropagation();

    dispatch(deleteContact(contact.id));
    dispatch(setCurrentContact(createEmptyContact()));
  };

  return (
    <div
      className="contact-item"
      onDoubleClick={onEditContact}
    >
      <span>
        {contact.firstName} {contact.lastName}
      </span>

      <button
        type="button"
        className="delete-btn"
        onClick={onDeleteClick}
      >
        ✕
      </button>
    </div>
  );
}

export default ContactItem;