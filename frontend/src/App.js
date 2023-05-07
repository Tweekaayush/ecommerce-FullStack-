import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import WebFont from "webfontloader";
import Navbar from "./components/layout/Navbar/Navbar"
import Footer from "./components/layout/Footer/Footer"
import Home from "./components/Home/Home"
import Login from "./components/User/Login"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Product from "./components/Product/Product";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Browse from "./components/Product/Browse"
import Profile from "./components/User/Profile"
import ForgotPassword from "./components/User/ForgotPassword"
import ResetPassword from "./components/User/ResetPassword"
import Cart from "./components/Cart/Cart"
import Wishlist from "./components/Cart/Wishlist"
import Billing from "./components/Cart/Billing"
import NotFound from "./components/layout/Not Found/NotFound";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment.js"
import About from "./components/layout/About/About"
import Contact from "./components/layout/Contact/Contact"
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"
import OrderSuccess from "./components/Cart/OrderSuccess.js"

function App() {

  const {isAuthenticated, user} = useSelector((state) => state.user)
  const {cartItems} = useSelector((state)=>state.cart)
  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey(){

    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey)

  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Raleway ","Kaushan Script","Sigmar One", "Phudu"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  },[])
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path ="/" element={<Home/>} />
        <Route exact path ="/login" element={<Login/>} />
        <Route exact path ="/product/:id" element={<Product/>}/>
        <Route exact path ="/browse" element={<Browse/>}/>
        <Route exact path ="/browse/:keyword" element={<Browse/>}/>
        <Route exact path = "/account" element={isAuthenticated ? <Profile/> : <Navigate to="/login"/>}></Route>
        <Route exact path = "/password/forgot" element={<ForgotPassword/>}></Route>
        <Route exact path = "/password/reset/:token" element={<ResetPassword/>}></Route>
        <Route exact path = "/wishlist" element={<Wishlist/>}></Route>
        <Route exact path = "/about" element={<About/>}></Route>
        <Route exact path = "/contact" element={<Contact/>}></Route>
        <Route exact path = "/cart" element={isAuthenticated ? <Cart/> : <Navigate to="/"/>}></Route>
        <Route exact path = "/billing" element={isAuthenticated ? <Billing/> : <Navigate to="/"/>}></Route>
        <Route exact path = "/order/confirm" element={isAuthenticated ? <ConfirmOrder/> : <Navigate to="/"/>}></Route>
        <Route exact path = "/process/payment" element={isAuthenticated ?
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment/>
          </Elements>
            : <Navigate to="/"/>}>
        </Route>
        <Route exact path = "/success" element={isAuthenticated ? <OrderSuccess/> : <Navigate to="/"/>}></Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
