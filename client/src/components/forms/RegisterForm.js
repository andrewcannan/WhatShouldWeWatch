import React, { useState } from "react";


const RegisterForm = () => {
    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setFormData({...formData, [id]: value})

    }

    return (
        <form>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} placeholder="Username" required></input>
                <label for="username">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} placeholder="Password" required></input>
                <label for="password">Password</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required></input>
                <label for="confirmPassword">Confirm Password</label>
            </div>
            <button type="submit" className="btn btn-danger mb-3">Register</button>
        </form>
    )
}

export default RegisterForm;