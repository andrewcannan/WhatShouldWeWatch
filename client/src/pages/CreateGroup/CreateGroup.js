import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  showErrorToast } from '../../components/ToastHelper.js'
import { getSessionCookie } from '../../components/CookieUtil.js'
import CreateGroupForm from '../../components/forms/CreateGroupForm';
import LogoNav from '../../components/LogoNav';
import LogutBar from '../../components/LogoutBar';
import './CreateGroup.css'


const CreateGroup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);

    return(
        <div className='create-group'>
            <LogoNav />
            <div className='form-wrapper'>
                <h1 className='title'>Create Group</h1>
                <CreateGroupForm />
            </div>
            <LogutBar />
        </div>
    )
}

export default CreateGroup;