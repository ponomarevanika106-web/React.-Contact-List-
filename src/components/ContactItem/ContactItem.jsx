import "./ContactItem.css";

function ContactItem({
  contact,
  editContact,
  deleteContact,
}) {
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteContact(contact.id);
  };

  return (
    <div
      className="contact-item"
      onDoubleClick={() => editContact(contact)}
    >
      <span className="contact-name">
        {contact.firstName} {contact.lastName}
      </span>

      <button
        className="delete-btn"
        type="button"
        onClick={handleDelete}
      >
        ✕
      </button>
    </div>
  );
}

export default ContactItem;