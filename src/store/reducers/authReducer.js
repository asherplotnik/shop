import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };
    case actionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        error: action.data
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
