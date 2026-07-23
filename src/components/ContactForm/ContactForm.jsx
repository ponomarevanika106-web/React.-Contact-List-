import { useState, useEffect } from "react";
import "./ContactForm.css";

const createEmptyContact = () => ({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

function ContactForm({
  contact,
  saveContact,
  deleteContact,
  newContact,
}) {
  const [form, setForm] = useState(createEmptyContact());

  useEffect(() => {
    setForm(contact || createEmptyContact());
  }, [contact]);

  const onInputChange = ({ target: { name, value } }) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onClearField = ({ target }) => {
    const { name } = target.previousElementSibling;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: "",
    }));
  };

  const onSaveContact = (e) => {
    e.preventDefault();

    saveContact(form);

    if (!form.id) {
      setForm(createEmptyContact());
    }
  };

  const onNewContact = () => {
    newContact();
    setForm(createEmptyContact());
  };

  return (
    <form className="contact-form" onSubmit={onSaveContact}>
      <div className="input-group">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={onInputChange}
        />
        <button type="button" onClick={onClearField}>
          ✕
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={onInputChange}
        />
        <button type="button" onClick={onClearField}>
          ✕
        </button>
      </div>

      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onInputChange}
        />
        <button type="button" onClick={onClearField}>
          ✕
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={onInputChange}
        />
        <button type="button" onClick={onClearField}>
          ✕
        </button>
      </div>

      <div className="buttons">
        <button type="button" onClick={onNewContact}>
          New
        </button>

        <button type="submit">
          Save
        </button>

        {form.id && (
          <button
            type="button"
            onClick={() => deleteContact(form.id)}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;