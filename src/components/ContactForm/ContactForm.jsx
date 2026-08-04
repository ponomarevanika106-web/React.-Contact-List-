import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ContactForm.css";
import api from "../../api/contacts-service";

import {
  addContact,
  updateContact,
  deleteContact,
  setCurrentContact,
} from "../../store/actions/contactActions";

import { createEmptyContact } from "../../constants/constants";

function ContactForm() {
  const dispatch = useDispatch();

  const contact = useSelector((state) => state.currentContact);

  const [form, setForm] = useState(createEmptyContact());

  useEffect(() => {
    setForm(contact);
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

    if (form.id) {
      api
        .put(`/${form.id}`, form)
        .then(({ data }) => {
          dispatch(updateContact(data));
          dispatch(setCurrentContact(data));
        })
        .catch(console.error);
    } else {
      api
        .post("/", {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
        })
        .then(({ data }) => {
          dispatch(addContact(data));
          dispatch(setCurrentContact(createEmptyContact()));
        })
        .catch(console.error);
    }
  };

  const onDelete = () => {
    api
      .delete(`/${form.id}`)
      .then(() => {
        dispatch(deleteContact(form.id));
        dispatch(setCurrentContact(createEmptyContact()));
      })
      .catch(console.error);
  };

  const onNewContact = () => {
    dispatch(setCurrentContact(createEmptyContact()));
  };

  return (
    <form onSubmit={onSaveContact}>
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
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;