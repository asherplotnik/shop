import * as actionTypes from "./actionTypes";
export const signInSuccess = (token, userId, level) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    token: token,
    userId: userId,
    level: level
  };
};

export const signInFail = data => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    data: data
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
        const level = localStorage.getItem("level");
        dispatch(signInSuccess(token, userId, level));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
