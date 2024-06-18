import React, { useState, useEffect } from "react";
import "./App.css";

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
