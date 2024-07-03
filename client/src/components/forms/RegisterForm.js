import React, { useState } from "react";
import { showSuccessToast, showErrorToast } from "../ToastHelper";


const RegisterForm = () => {
    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({...formData, [id]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            // change style of input, add warning to user, remove alert
            alert('Passwords do not match');
            return;
        }

        const form = new FormData();
        form.append('username', username);
        form.append('password', password);

        try {
            const response = await fetch('/register', {
                method: 'POST',
                body: form
            });

            if (response.ok) {
                const data = await response.json();
                showSuccessToast(data.message);
            } else {
                const errorData = await response.json();
                showErrorToast(errorData.error);
            }
        } catch(error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    };

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
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required></input>
                <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <button type="submit" className="btn btn-danger mb-3">Create</button>
        </form>
    );
};

export default RegisterForm;