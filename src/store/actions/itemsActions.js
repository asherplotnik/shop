import * as actionTypes from "./actionTypes";

export const setItems = (items) => {
  return {
    type: actionTypes.SET_ITEMS,
    items: items,
  };
};

export const setStock = (stock) => {
  return {
    type: actionTypes.SET_STOCK,
    stock: stock,
  };
};

export const setLoadingFalse = () => {
  return {
    type: actionTypes.SET_LOADING_FALSE,
  };
};

export const addPressed = () => {
  return {
    type: actionTypes.ADD_PRESSED,
  };
};

export const deletePressed = (rowId) => {
  return {
    type: actionTypes.DELETE_PRESSED,
    rowId: rowId,
  };
};
export const updatePressed = (row) => {
  return {
    type: actionTypes.UPDATE_PRESSED,
    row: row,
  };
};

export const setCollectionSelect = (col) => {
  return {
    type: actionTypes.SET_COLLECTION_SELECT,
    col: col,
  };
};
export const toggleUpdateOff = (col) => {
  return {
    type: actionTypes.TOGGLE_UPDATE_OFF,
    col: col,
  };
};
export const toggleAddOff = (col) => {
  return {
    type: actionTypes.TOGGLE_ADD_OFF,
    col: col,
  };
};
export const bulkPressed = () => {
  return {
    type: actionTypes.BULK_PRESSED,
  };
};

export const setPageRangeBack = () => {
  return {
    type: actionTypes.SET_PAGE_RANGE_BACK,
  };
};

export const setPageRangeForward = () => {
  return {
    type: actionTypes.SET_PAGE_RANGE_FORWARD,
  };
};
export const resetRange = () => {
  return {
    type: actionTypes.RESET_RANGE,
  };
};
