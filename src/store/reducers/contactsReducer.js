import ACTION_TYPES from "../actions/actionTypes";

const initialState = [];

function contactsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ACTION_TYPES.SET_CONTACTS:
      return payload;

    case ACTION_TYPES.ADD_CONTACT:
      return [...state, payload];

    case ACTION_TYPES.UPDATE_CONTACT:
      return state.map((contact) =>
        contact.id === payload.id ? payload : contact
      );

    case ACTION_TYPES.DELETE_CONTACT:
      return state.filter(
        (contact) => contact.id !== payload
      );

    default:
      return state;
  }
}

export default contactsReducer;