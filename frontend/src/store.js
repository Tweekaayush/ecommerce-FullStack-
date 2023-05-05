import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productDetailsReducer, productsReducer} from "./reducers/productReducer";
import {configureStore} from "@reduxjs/toolkit"
import { profileReducer, userReducer, forgotPasswordReducer} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = {
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart:cartReducer
};

let initialState = {
  cart:{
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[]
  }
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  middleware
});

export default store;