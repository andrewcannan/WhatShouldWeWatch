import React from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Login from 'client/src/pages/Login'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
