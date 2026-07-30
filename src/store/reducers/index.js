import { combineReducers } from "redux";

import contactsReducer from "./contactsReducer";
import currentContactReducer from "./currentContactReducer";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  currentContact: currentContactReducer,
});

export default rootReducer;