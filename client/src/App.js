import React from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Login from './pages/Login/Login.js'
import Register from './pages/Register/Register.js'

function App() {
    return (
        <div className="App">
            <Router>
            <ToastContainer position='top-right' />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
