import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../api/contacts-service";

const emptyContact = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    return await getContacts();
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact) => {
    return await createContact(contact);
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async (contact) => {
    return await updateContact(contact);
  }
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (id) => {
    await deleteContact(id);
    return id;
  }
);

const contactsSlice = createSlice({
  name: "contacts",

  initialState: {
    contacts: [],
    currentContact: emptyContact,
    loading: false,
    error: null,
  },

  reducers: {
    setCurrentContact(state, action) {
      state.currentContact = action.payload;
    },

    newContact(state) {
      state.currentContact = emptyContact;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.currentContact = emptyContact;
      })

      .addCase(editContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );

        if (index !== -1) {
          state.contacts[index] = action.payload;
        }

        state.currentContact = action.payload;
      })

      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );

        state.currentContact = emptyContact;
      });
  },
});

export const {
  setCurrentContact,
  newContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;