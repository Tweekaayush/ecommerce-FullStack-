import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, recommendedProductsReducer} from "./reducers/productReducer";
import { profileReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart:cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  product: productReducer,
  userDetails: userDetailsReducer,
  recomProducts:recommendedProductsReducer
})

const initialState = {
  cart:{
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
    billingInfo: localStorage.getItem("billingInfo") ? JSON.parse(localStorage.getItem("billingInfo")):{}
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;