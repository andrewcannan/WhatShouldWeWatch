import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import { Link } from 'react-router-dom';
import './Register.css'


const Register = () => {
    return(
        <div className="register">
            <div className="form-wrapper">
                <h1 className="mb-3">Create Account</h1>
                <RegisterForm />
                <p>Already a Member? <Link to='/login'>Sign in Here!</Link></p>
            </div>
        </div>
    )
}

export default Register;