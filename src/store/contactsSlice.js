
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../api/contacts-service";
import { createEmptyContact } from "../constants/constants";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  getContacts
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  createContact
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  updateContact
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  deleteContact
);

const contactsSlice = createSlice({
  name: "contacts",

  initialState: {
    contacts: [],
    currentContact: createEmptyContact(),
    loading: false,
    error: null,
  },

  reducers: {
    setCurrentContact(state, action) {
      state.currentContact = action.payload;
    },

    newContact(state) {
      state.currentContact = createEmptyContact();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.currentContact = createEmptyContact();
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.error.message;
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
      .addCase(editContact.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );

        if (state.currentContact.id === action.payload) {
          state.currentContact = createEmptyContact();
        }
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setCurrentContact, newContact } = contactsSlice.actions;

export default contactsSlice.reducer;

