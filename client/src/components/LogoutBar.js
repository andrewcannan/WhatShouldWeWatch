import React from 'react';
import { showSuccessToast } from './ToastHelper';
import { showErrorToast } from './ToastHelper';
import { useNavigate } from 'react-router-dom';

const LogutBar = () => {
    const navigate = useNavigate()
    const serverURL = process.env.REACT_APP_SERVER_API;

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverURL}/logout`);

            if (response.ok) {
                const data = await response.json();
                showSuccessToast(data.message);
                navigate('/')
            } 
        } catch(error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    }

    return (
        <nav className="navbar fixed-bottom" style={{backgroundColor: '#000', justifyContent: 'center', alignItems: 'center'}}>
            <a className="navbar-brand d-flex align-items-center" href="/" style={{ fontFamily: 'Roboto', color: '#be1423' }} onClick={handleLogout}>
                Logout<i className="fa-solid fa-arrow-right-from-bracket ms-2"></i>
            </a>
        </nav>
    )
}

export default LogutBar