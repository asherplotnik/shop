import * as actionTypes from "./actionTypes";
export const signInSuccess = (token, userId, user) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    token: token,
    userId: userId,
    user: user
  };
};

export const signInFail = data => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    data: data
  };
};
export const changeAddress = address => {
  return {
    type: actionTypes.CHANGE_ADDRESS,
    address: address
  };
};

export const logout = () => {
  localStorage.removeItem("level");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const user = localStorage.getItem("user");
        dispatch(signInSuccess(token, userId, user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
