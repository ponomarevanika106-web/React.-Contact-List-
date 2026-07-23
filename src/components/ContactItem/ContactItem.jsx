import "./ContactItem.css";

function ContactItem({
  contact,
  editContact,
  deleteContact,
}) {
  const handleEdit = () => {
    editContact(contact.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteContact(contact.id);
  };

  return (
    <div
      className="contact-item"
      onDoubleClick={handleEdit}
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