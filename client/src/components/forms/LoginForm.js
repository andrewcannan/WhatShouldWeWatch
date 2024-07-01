import React, { useState } from "react";


const LoginForm = () => {
    const [ formData, setFormdata ] = useState({
        usename: '',
        password: ''
    })

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormdata({...formData, [id]: value});
    }

    return (
        <form>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} placeholder="Username" required></input>
                <label for="username">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" value={formData.password} placeholder="Password" required></input>
                <label for="password">Password</label>
            </div>
            <button type="submit" className="btn btn-danger mb-3">Log In</button>
        </form>
    );
}

export default LoginForm;