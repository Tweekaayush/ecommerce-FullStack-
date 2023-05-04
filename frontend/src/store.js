import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productDetailsReducer, productsReducer} from "./reducers/productReducer";
import {configureStore} from "@reduxjs/toolkit"
import { profileReducer, userReducer, forgotPasswordReducer} from "./reducers/userReducer";

const reducer = {
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer
};

let initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  middleware
});

export default store;