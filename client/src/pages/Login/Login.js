import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import { Link } from 'react-router-dom';
import './Login.css'


const Login = () => {
    return(
        <div className="login">
            <div className="form-wrapper">
                <h1 className="mb-3">Login</h1>
                <LoginForm />
                <p>Need an Account? <Link to='/register'>We Got You!</Link></p>
            </div>
        </div>
    )
}

export default Login;