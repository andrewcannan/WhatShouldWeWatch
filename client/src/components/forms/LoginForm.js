import React, { useState } from "react";
import { showSuccessToast, showErrorToast } from '../ToastHelper.js'
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {
    const navigate = useNavigate();
    const [ formData, setFormdata ] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormdata({...formData, [id]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                body: form
            });

            if (response.ok) {
                const data = await response.json();
                showSuccessToast(data.message);
                navigate('/groups');
            } else {
                const errorData = await response.json();
                showErrorToast(errorData.error);
                
            }
        } catch(error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} placeholder="Username" required></input>
                <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder="Password" required></input>
                <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn btn-danger mb-3 ms-auto d-block">Sign In</button>
        </form>
    );
}

export default LoginForm;