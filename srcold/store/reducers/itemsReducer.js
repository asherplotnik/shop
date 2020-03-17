import * as actionTypes from "../actions/actionTypes";

const initialState = {
  itmes: [],
  loading: true,
  addPressed: false,
  deletePressed: false,
  updatePressed: false,
  pressedRecordId: null,
  pressedRecordColl: null,
  pressedRecordCode: null,
  pressedRecordCollection: null,
  pressedRecordDesc: null,
  pressedRecordSize: null,
  pressedRecordType: null,
  pressedRecordPrice: null,
  updateToggleOn: false,
  collectionSelect: [],
  canceled: false
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case actionTypes.SET_LOADING_FALSE:
      return {
        ...state,
        loading: false
      };
    case actionTypes.ADD_PRESSED:
      return {
        ...state,
        addPressed: !state.addPressed
      };
    case actionTypes.DELETE_PRESSED:
      return {
        ...state,
        deletePressed: !state.deletePressed,
        pressedRecordId: action.rowId
      };
    case actionTypes.UPDATE_PRESSED:
      return {
        ...state,
        updatePressed: !state.updatePressed,
        pressedRecordId: action.row.Id,
        pressedRecordCode: action.row.code,
        pressedRecordCollection: action.collection,
        pressedRecordSize: action.row.size,
        pressedRecordType: action.row.type,
        pressedRecordPrice: action.row.price,
        pressedRecordDesc: action.row.desc
      };
    case actionTypes.SET_COLLECTION_SELECT:
      return {
        ...state,
        collectionSelect: action.col
      };
    default:
      return state;
  }
};

export default itemsReducer;
