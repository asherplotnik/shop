import * as actionTypes from "./actionTypes";
export const signInSuccess = (token, userId, user) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    token: token,
    userId: userId,
    user: user,
  };
};

export const signInFail = (data) => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    data: data,
  };
};
export const changeAddress = (address) => {
  return {
    type: actionTypes.CHANGE_ADDRESS,
    address: address,
  };
};
export const changeEmail = (email) => {
  return {
    type: actionTypes.CHANGE_EMAIL,
    email: email,
  };
};
export const changePhone = (phone) => {
  return {
    type: actionTypes.CHANGE_PHONE,
    phone: phone,
  };
};
export const changeUserName = (username) => {
  return {
    type: actionTypes.CHANGE_USERNAME,
    username: username,
  };
};

export const logout = () => {
  localStorage.removeItem("level");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPhone");
  localStorage.removeItem("userLevel");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("userAddress");
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = localStorage.getItem("expirationDate");
      if (expirationDate <= Date.now()) {
        dispatch(logout());
      } else {
        const user = {
          id: localStorage.getItem("userId"),
          username: localStorage.getItem("userName"),
          address: localStorage.getItem("userAddress"),
          phone: localStorage.getItem("userPhone"),
          level: localStorage.getItem("userLevel"),
          email: localStorage.getItem("userEmail"),
        };
        const userId = localStorage.getItem("userId");
        dispatch(signInSuccess(token, userId, user));
        dispatch(checkAuthTimeout(expirationDate - Date.now()));
      }
    }
  };
};
