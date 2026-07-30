import "./ContactItem.css";

function ContactItem({
  contact,
  editContact,
  deleteContact,
}) {
  const onDeleteClick = (e) => {
    e.stopPropagation();
    deleteContact(contact.id);
  };

  return (
    <div
      className="contact-item"
     onDoubleClick={() => {
     editContact(contact);
}}
    >
      <span className="contact-name">
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