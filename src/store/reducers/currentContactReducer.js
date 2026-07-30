import { createEmptyContact } from "../../constants/constants";
import ACTION_TYPES from "../actions/actionTypes";

function currentContactReducer(
  state = createEmptyContact(),
  { type, payload }
) {
  switch (type) {
    case ACTION_TYPES.SET_CURRENT_CONTACT:
      return payload;

    case ACTION_TYPES.ADD_CONTACT:
      return createEmptyContact();

    case ACTION_TYPES.UPDATE_CONTACT:
      return payload;

    case ACTION_TYPES.DELETE_CONTACT:
      return createEmptyContact();

    default:
      return state;
  }
}

export default currentContactReducer;