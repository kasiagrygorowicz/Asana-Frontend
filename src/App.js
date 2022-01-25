import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About.js";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/features" component={Features} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/about" component={About} />
      </Routes>
    </Router>
  );
}
export default App;