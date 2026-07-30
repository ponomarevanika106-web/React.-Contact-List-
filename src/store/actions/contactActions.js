import ACTION_TYPES from "./actionTypes";

export const setContacts = (contacts) => ({
  type: ACTION_TYPES.SET_CONTACTS,
  payload: contacts,
});

export const addContact = (contact) => ({
  type: ACTION_TYPES.ADD_CONTACT,
  payload: contact,
});

export const updateContact = (contact) => ({
  type: ACTION_TYPES.UPDATE_CONTACT,
  payload: contact,
});

export const deleteContact = (id) => ({
  type: ACTION_TYPES.DELETE_CONTACT,
  payload: id,
});

export const setCurrentContact = (contact) => ({
  type: ACTION_TYPES.SET_CURRENT_CONTACT,
  payload: contact,
});