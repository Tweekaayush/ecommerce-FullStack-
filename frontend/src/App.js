import React from "react";
import './App.css';
import WebFont from "webfontloader";
import Navbar from "./components/layout/Navbar/Navbar"
import Footer from "./components/layout/Footer/Footer"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Product from "./components/Product/Product.js";

function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Raleway ","Kaushan Script","Sigmar One", "Phudu"]
      }
    })
  })

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path ="/" element={<Home/>} />
        <Route exact path ="/login" element={<Login/>} />
        <Route exact path ="/product/:id" element={<Product/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
