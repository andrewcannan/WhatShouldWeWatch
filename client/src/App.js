import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
    const [text, setText] = useState("");

    useEffect(() => {
        fetch("/hello").then(
            (res) => res.text()
        ).then(
            (data) => {
                setText(data);
            });
    }, []);

    return (
        <div className="App">
            {text}
        </div>
    );
}

export default App;
