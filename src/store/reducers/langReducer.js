import * as actionTypes from "../actions/actionTypes";
const initialState = {
  lang: "eng",
};

const langReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANG:
      return {
        ...state,
        lang: action.lang,
      };
    default:
      return state;
  }
};
export default langReducer;
