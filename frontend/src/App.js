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
import Billing from "./components/Cart/Billing"
import NotFound from "./components/layout/Not Found/NotFound";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment.js"
import About from "./components/layout/About/About"
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"
import OrderSuccess from "./components/Cart/OrderSuccess.js"
import Dashboard from "./components/Admin/Dashboard.js"
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";
import News from "./components/layout/News/News";
import Support from "./components/layout/Support/Support";

function App() {

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey(){

    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey)

  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Raleway ","Kaushan Script","Sigmar One", "Phudu", "Lato","Montserrat"]
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
        <Route exact path ="/about" element={<About/>} />
        <Route exact path ="/support" element={<Support/>} />
        <Route exact path ="/login" element={<Login/>} />
        <Route exact path ="/product/:id" element={<Product/>}/>
        <Route exact path ="/browse" element={<Browse/>}/>
        <Route exact path ="/browse/:keyword" element={<Browse/>}/>
        <Route exact path = "/password/forgot" element={<ForgotPassword/>}/>
        <Route exact path = "/password/reset/:token" element={<ResetPassword/>} />
        <Route exact path = "/news" element={<News/>}></Route>        

        {/* Private Routes */}

        <Route element={<PrivateRoute/>}>
          <Route exact path = "/account" element={<Profile/>}></Route>
          <Route exact path = "/cart" element={<Cart/>}></Route>
          <Route exact path = "/billing" element={<Billing/>}></Route>
          <Route exact path = "/order/confirm" element={<ConfirmOrder/>}></Route>
          <Route exact path = "/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment/>
            </Elements>
          }>
          </Route>
          <Route exact path = "/success" element={<OrderSuccess/>}></Route>

          {/* Admin Routes */}

          <Route element = {<AdminRoute isAdmin={true} />}>
            <Route exact path = "/admin/dashboard" element={<Dashboard/>}></Route>
          </Route>

        </Route>

        <Route path="/*"element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
