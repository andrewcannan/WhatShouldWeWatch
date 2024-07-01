import React, { useState } from "react";


const LoginForm = () => {
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
                // add success toast, remove console log
                const data = await response.json();
                console.log('Login Successful:', data);
            } else {
                // add error toast, remove console error
                const errorData = response.json();
                console.error('Login Failed:', errorData)
            }
        } catch(error) {
            // add unexpected error toast
            console.error('An error occured:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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