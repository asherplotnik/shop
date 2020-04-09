import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  stock: [],
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
  pressedRecordTrending: null,
  updateToggleOn: false,
  collectionSelect: [],
  bulkPressed: false,
  asher: null,
  canceled: false
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case actionTypes.SET_STOCK:
      return {
        ...state,
        stock: action.stock
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
        pressedRecordId: action.row.rowId,
        pressedRecordCode: action.row.code,
        pressedRecordCollection: action.row.collection,
        pressedRecordDesc: action.row.desc,
        pressedRecordSize: action.row.size,
        pressedRecordType: action.row.typology,
        pressedRecordPrice: action.row.price,
        pressedRecordTrending: action.row.Trending
      };
    case actionTypes.SET_COLLECTION_SELECT:
      return {
        ...state,
        collectionSelect: action.col
      };
    case actionTypes.TOGGLE_UPDATE_OFF:
      return {
        ...state,
        updatePressed: false,
        pressedRecordId: null,
        pressedRecordCode: null,
        pressedRecordCollection: null,
        pressedRecordDesc: null,
        pressedRecordSize: null,
        pressedRecordType: null,
        pressedRecordPrice: null
      };
    case actionTypes.TOGGLE_ADD_OFF:
      return {
        ...state,
        addPressed: false,
        pressedRecordId: null,
        pressedRecordCode: null,
        pressedRecordCollection: null,
        pressedRecordDesc: null,
        pressedRecordSize: null,
        pressedRecordType: null,
        pressedRecordPrice: null
      };
    case actionTypes.BULK_PRESSED:
      return {
        ...state,
        bulkPressed: !state.bulkPressed
      };
    default:
      return state;
  }
};

export default itemsReducer;
