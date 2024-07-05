import React, { useState, useEffect } from 'react';
import { getCookie } from './cookieUtil';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from './ToastHelper';


const GroupsList = () => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState();
    const [ groups, setGroups ] = useState();

    useEffect(() => {
        const userCookie = getCookie('user');
        if (!userCookie) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } else {
            setUser(userCookie);
            fetchGroups();
        }
    }, [navigate]);

    const fetchGroups = async (user) => {
        try {
            const response = await fetch('/getGroups', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setGroups(data.groups);
        } catch (error) {
            showErrorToast('An unexpected error occurred.');
            console.error(error);
        }
    }
}

export default GroupsList;