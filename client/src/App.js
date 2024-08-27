import React from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'

import Login from './pages/Login/Login.js'
import Register from './pages/Register/Register.js'
import Groups from './pages/Groups/Groups.js'
import CreateGroup from "./pages/CreateGroup/CreateGroup.js";
import JoinGroup from "./pages/JoinGroup/JoinGroup.js";
import Welcome from "./pages/Welcome/Welcome.js";

function App() {
    return (
        <div className="App">
            <Router>
            <ToastContainer position='top-right' />
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                    <Route path="/join-group" element={<JoinGroup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
