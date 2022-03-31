import React from "react";
import {BrowserRouter as Router, Routes, Route, Redirect, Navigate} from "react-router-dom";
import {useContext} from "react";
import Navbar from "./component/layout/Navbar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About.js";
import Pricing from "./pages/Pricing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./component/layout/Footer"
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
import UserProfile from "./pages/UserProfile";
import Team from "./pages/Team";
import AccountConfirmationPage from "./pages/AccountConfirmationPage";
import VerticalBar from './component/VerticalBar';
import Layout from "./component/layout/Layout";

function App() {
    const authCtx = useContext(AuthContext)
    const t = useTranslation()[0]
    return (
        <Router>
            <Layout t={t}>
            {/*<Navbar />*/}
            <Routes>
                <Route path="/" element={<Home t={t} />} />
                <Route path="/features" element={<Features t={t}/>} />
                <Route path="/pricing" element={<Pricing t={t} />} />
                <Route path="/about" element={<About t={t}/>} />
                <Route path="/signup" element={<Signup t={t}/>}/>

                <Route path="/confirm" element= {<AccountConfirmationPage t={t} />} />
                {!authCtx.isLoggedIn &&
                    <Route path="/login" element={<Login t={t}/>}/>

                }
                {authCtx.isLoggedIn && (
                    <>
                        <Route path="/dashboard" element={<> <VerticalBar t={t}/><Dashboard t={t}/></>} />
                        <Route path="/addproject" element={<> <VerticalBar t={t}/><AddProject t={t}/></> } />
                        <Route path="/addteam" element={<> <VerticalBar t={t}/><AddTeam t={t}/> </>} />
                        <Route path="/project/:projectId" element={<> <VerticalBar t={t}/><Project t={t}/></>} />
                        <Route path="/addtask" element={<> <VerticalBar t={t}/><AddTask t={t}/> </>} />
                        <Route path="/editteam/:teamId" element= {<> <VerticalBar t={t}/><EditTeam t={t} /></>} />
                        <Route path="/editproject/:projectId" element= {<> <VerticalBar t={t}/><EditProject t={t} /> </>} />
                        <Route path="/userprofile/:userName" element= {<UserProfile t={t} />} />

                        <Route path="/team/:teamId" element= {<>
                            <VerticalBar t={t}/><Team t={t} /> </>} />
                    </>
                )}
                <Route path='*' element={<Navigate to="/" />} />

            </Routes>
            </Layout>
            {/*<Footer t={t} />*/}
        </Router>
    );
}
export default App;