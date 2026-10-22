import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import contactsReducer from "./contactsSlice";

const logger = createLogger();

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export default store;