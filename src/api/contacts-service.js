const API_URL = "http://localhost:5000/contacts";

export const getContacts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createContact = async (contact) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  return response.json();
};

export const updateContact = async (contact) => {
  const response = await fetch(`${API_URL}/${contact.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  return response.json();
};

export const deleteContact = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return id;
};