import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";

import api from "./api/contacts-service";
import { setContacts } from "./store/actions/contactActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/")
      .then(({ data }) => {
        dispatch(setContacts(data));
      })
      .catch(console.error);
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Contact List</h1>

      <div className="content">
        <ContactList />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;