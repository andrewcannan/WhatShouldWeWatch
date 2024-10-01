import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  showErrorToast } from '../../components/ToastHelper.js'
import { getSessionCookie } from '../../components/CookieUtil.js'
import GroupsList from '../../components/GroupsList'
import LogoNav from '../../components/LogoNav';
import LogutBar from '../../components/LogoutBar';
import './Groups.css';

const Groups = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);

    return(
        <div className='groups'>
            <LogoNav />
            <GroupsList />
            <LogutBar />
        </div>
    )
}

export default Groups;