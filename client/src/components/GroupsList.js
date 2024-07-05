import React, { useState, useEffect } from 'react';
import { getCookie } from './cookieUtil';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from './ToastHelper';


const GroupsList = () => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState();

    useEffect(() => {
        const userCookie = getCookie('user');
        if (!userCookie) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } else {
            setUser(userCookie);
        }
    }, [navigate]);
}

export default GroupsList;