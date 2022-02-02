import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About.js";
import Pricing from "./pages/Pricing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./component/Footer"
import './translations/i18n';
import {useTranslation} from "react-i18next";

function App() {
    const t = useTranslation()[0]
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features t={t}/>} />
        <Route path="/pricing" element={<Pricing t={t} />} />
        <Route path="/about" element={<About t={t}/>} />
        <Route path="/signup" element={<Signup t={t}/>} />
        <Route path="/login" element={<Login t={t}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;