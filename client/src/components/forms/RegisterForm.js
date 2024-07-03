import React, { useState } from "react";
import { showSuccessToast, showErrorToast } from "../ToastHelper";


const RegisterForm = () => {
    const [ passwordErrors, setPasswordErrors ] = useState([]);
    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({...formData, [id]: value})
        if (id === 'password') {
            validatePassword(value);
        };
    };

    const validatePassword = (password) => {
        const errors = [];

        if (password.length < 8) {
            errors.push('Password must be at least 8 characters');
        };
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        };
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        };
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one digit');
        };
        setPasswordErrors(errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            showErrorToast('Passwords do not match');
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
                <input type="password" className={`form-control ${passwordErrors.length > 0 ? 'is-invalid' : ''}`} id="password" value={formData.password} onChange={handleChange} placeholder="Password" required></input>
                <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className={`form-control ${
                    formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword ? 'is-invalid' : ''}`} 
                    id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required></input>
                <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <div className="mb-3">
            {passwordErrors.length > 0 && (
                    <small id="passwordHelpBlock" className="form-text text-muted">
                        <i className='fa-regular fa-circle-xmark' style={{ marginRight: '8px', color: '#b10000' }}></i><span style={{color: '#b10000'}}>{passwordErrors[0]}</span>
                    </small>
                )}
            </div>
            <button type="submit" className="btn btn-danger mb-3">Create</button>
        </form>
    );
};

export default RegisterForm;