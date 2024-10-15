import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionCookie } from '../../components/CookieUtil';
import { showErrorToast } from '../../components/ToastHelper';
import LogoNav from '../../components/LogoNav';
import BottomNav from '../../components/BottomNav';

const GroupShows = () => {
    const navigate = useNavigate();
    const { groupId } = useParams(); //groupId to be passed to children

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);


    return (
        <div className='group-shows'>
            <LogoNav />
            <BottomNav />
        </div>
    );
};

export default GroupShows;