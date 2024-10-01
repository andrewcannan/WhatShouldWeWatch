import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  showErrorToast } from '../../components/ToastHelper.js'
import { getSessionCookie } from '../../components/CookieUtil.js'
import JoinGroupForm from '../../components/forms/JoinGroupForm';
import LogoNav from '../../components/LogoNav';
import LogutBar from '../../components/LogoutBar';
import './JoinGroup.css'


const JoinGroup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);

    return(
        <div className='join-group'>
            <LogoNav />
            <div className='form-wrapper'>
                <h1 className='title text-center mb-3'>Join Group</h1>
                <JoinGroupForm />
            </div>
            <LogutBar />
        </div>
    )
}

export default JoinGroup;