import * as actionTypes from "./actionTypes";

export const setItems = items => {
  return {
    type: actionTypes.SET_ITEMS,
    items: items
  };
};

export const setLoadingFalse = () => {
  return {
    type: actionTypes.SET_LOADING_FALSE
  };
};

export const addPressed = () => {
  return {
    type: actionTypes.ADD_PRESSED
  };
};

export const deletePressed = rowId => {
  return {
    type: actionTypes.DELETE_PRESSED,
    rowId: rowId
  };
};
export const updatePressed = row => {
  return {
    type: actionTypes.UPDATE_PRESSED,
    row: row
  };
};

export const setCollectionSelect = col => {
  return {
    type: actionTypes.SET_COLLECTION_SELECT,
    col: col
  };
};
