import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productDetailsReducer, productsReducer} from "./reducers/productReducer";
import {configureStore} from "@reduxjs/toolkit"

const reducer = {
  products: productsReducer,
  productDetails: productDetailsReducer
};

let initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  middleware
});

export default store;