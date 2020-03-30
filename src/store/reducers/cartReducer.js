import * as actionTypes from "../actions/actionTypes";
const initialState = {
  entries: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        entries: action.data
      };
    case actionTypes.DELETE_ENTRY:
      return {
        ...state,
        entries: action.entries
      };
    default:
      return state;
  }
};

export default cartReducer;
