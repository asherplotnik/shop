import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import itemsReducer from "./store/reducers/itemsReducer";
import cartReducer from "./store/reducers/cartReducer";
import authReducer from "./store/reducers/authReducer";
import langReducer from "./store/reducers/langReducer";
import thunk from "redux-thunk";

const composeEnhancers = compose;
// const composeEnhancers =
//   process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

const rootReducer = combineReducers({
  itemsReducer: itemsReducer,
  cartReducer: cartReducer,
  authReducer: authReducer,
  langReducer: langReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
