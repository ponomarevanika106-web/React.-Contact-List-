
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/contacts",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getContacts = async () => {
  const { data } = await api.get("/");
  return data;
};

export const createContact = async (contact) => {
  const { data } = await api.post("/", contact);
  return data;
};

export const updateContact = async (contact) => {
  const { data } = await api.put(`/${contact.id}`, contact);
  return data;
};

export const deleteContact = async (id) => {
  await api.delete(`/${id}`);
  return id;
};
