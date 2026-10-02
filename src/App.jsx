import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import { fetchContacts } from "./store/contactsSlice";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="app">
      <div className="contact-container">
        <h1 className="contact-title">CONTACT LIST</h1>

        <div className="contact-content">
          <ContactList />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}