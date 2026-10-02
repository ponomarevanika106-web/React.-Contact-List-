import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addContact,
  editContact,
  removeContact,
  newContact,
  setCurrentContact,
} from "../../store/contactsSlice";
import "./ContactForm.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  const contact = useSelector((state) => state.contacts.currentContact);

  const onInputChange = (e) => {
    dispatch(
      setCurrentContact({
        ...contact,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onClearField = (field) => {
    dispatch(
      setCurrentContact({
        ...contact,
        [field]: "",
      })
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!contact.firstName && !contact.lastName) {
      return;
    }

    if (contact.id) {
      dispatch(editContact(contact));
    } else {
      dispatch(
        addContact({
          ...contact,
          id: uuidv4(),
        })
      );
    }
  };

  const onContactDelete = () => {
    if (contact.id) {
      dispatch(removeContact(contact.id));
    }
  };

  return (
    <form className="contact-form" onSubmit={onFormSubmit}>
      {[
        { name: "firstName", placeholder: "First Name", type: "text" },
        { name: "lastName", placeholder: "Last Name", type: "text" },
        { name: "email", placeholder: "Email", type: "email" },
        { name: "phone", placeholder: "Phone", type: "text" },
      ].map((field) => (
        <div className="field" key={field.name}>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={contact[field.name]}
            onChange={onInputChange}
          />

          <button
            type="button"
            onClick={() => onClearField(field.name)}
          >
            ✕
          </button>
        </div>
      ))}

      <div className="buttons">
        <button type="button" onClick={() => dispatch(newContact())}>
          New
        </button>

        <button type="submit">
          Save
        </button>

        {contact.id && (
          <button type="button" onClick={onContactDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
}