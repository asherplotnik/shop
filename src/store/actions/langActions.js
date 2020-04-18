import * as actionTypes from "./actionTypes";

export const changeLang = (lang) => {
  return {
    type: actionTypes.CHANGE_LANG,
    lang: lang,
  };
};
