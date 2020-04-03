import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  user: null
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        user: action.user
      };
    case actionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        error: action.data
      };
    case actionTypes.CHANGE_ADDRESS:
      return {
        ...state,
        user: { ...state.user, address: action.address }
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    default:
      return state;
  }
};
export default authReducer;
