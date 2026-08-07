import { useDispatch } from "react-redux";
import "./ContactItem.css";

import api from "../../api/contacts-service";

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

  const onDeleteContact = (e) => {
    e.stopPropagation();

    api
      .delete(`/${contact.id}`)
      .then(() => {
        dispatch(deleteContact(contact.id));
        dispatch(setCurrentContact(createEmptyContact()));
      })
      .catch(console.error);
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
        onClick={onDeleteContact}
      >
        ✕
      </button>
    </div>
  );
}

export default ContactItem;