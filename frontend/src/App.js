import React from "react";
import './App.css';
import WebFont from "webfontloader";
import Navbar from "./components/layout/Navbar/Navbar"
import Footer from "./components/layout/Footer/Footer"
import Home from "./components/Home/Home"
import Login from "./components/User/Login"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Product from "./components/Product/Product.js";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Browse from "./components/Product/Browse.js"

function App() {
  const {isAuthenticated, user} = useSelector((state) => state.user)
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Raleway ","Kaushan Script","Sigmar One", "Phudu"]
      }
    })
    store.dispatch(loadUser());
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
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
