import * as actionTypes from "./actionTypes";
export const addToCart = data => {
  return {
    type: actionTypes.ADD_TO_CART,
    data: data
  };
};

export const deleteEntry = entries => {
  return {
    type: actionTypes.DELETE_ENTRY,
    entries: entries
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART
  };
};
