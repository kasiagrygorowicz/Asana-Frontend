import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useContext} from "react";
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
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import AddTeam from "./pages/AddTeam";
import Project from "./pages/Project"
import AddTask from "./pages/AddTask";
import EditTeam from "./pages/EditTeam";
import EditProject from "./pages/EditProject";
import AuthContext from "./store/auth-context";

function App() {
    const authCtx = useContext(AuthContext)
    const t = useTranslation()[0]
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home t={t} />} />
        <Route path="/features" element={<Features t={t}/>} />
        <Route path="/pricing" element={<Pricing t={t} />} />
        <Route path="/about" element={<About t={t}/>} />
        <Route path="/signup" element={<Signup t={t}/>}/>
        {!authCtx.isLoggedIn &&
            <Route path="/login" element={<Login t={t}/>}/>
        }
        {authCtx.isLoggedIn && (
            <>
            <Route path="/dashboard" element={<Dashboard t={t}/>} />
            <Route path="/addproject" element={<AddProject t={t}/> } />
            <Route path="/addteam" element={<AddTeam t={t}/> } />
            <Route path="/project/:projectName" element={<Project t={t}/>} />
            <Route path="/addtask" element={<AddTask t={t}/> } />
            <Route path="/editteam/:teamName" element= {<EditTeam t={t} />} />
            <Route path="/editproject/:projectName" element= {<EditProject t={t} />} />
            </>
        )}
      </Routes>
      <Footer t={t} />
    </Router>
  );
}
export default App;