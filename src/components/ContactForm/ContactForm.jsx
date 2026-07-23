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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const clearField = (field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveContact(form);
  };

  const handleNew = () => {
    newContact();
    setForm(createEmptyContact());
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => clearField("firstName")}
        >
          ✕
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => clearField("lastName")}
        >
          ✕
        </button>
      </div>

      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => clearField("email")}
        >
          ✕
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => clearField("phone")}
        >
          ✕
        </button>
      </div>

      <div className="buttons">
        <button type="button" onClick={handleNew}>
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