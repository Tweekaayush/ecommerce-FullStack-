import React from "react";
import './App.css';
import Navbar from "./components/layout/Navbar/Navbar"
import Footer from "./components/layout/Footer/Footer"
import Home from "./components/Home/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      
        <Route exact path ="/" element={<Home/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
