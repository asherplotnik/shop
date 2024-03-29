import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  user: null,
  email: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        user: action.user,
      };
    case actionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        error: action.data,
      };
    case actionTypes.CHANGE_ADDRESS:
      return {
        ...state,
        user: { ...state.user, address: action.address },
      };
    case actionTypes.CHANGE_PHONE:
      return {
        ...state,
        user: {
          ...state.user,
          phone: action.phone,
        },
      };
    case actionTypes.CHANGE_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
        },
      };
    case actionTypes.CHANGE_USERNAME:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.username,
        },
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};
export default authReducer;
