import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionCookie } from '../../components/CookieUtil';
import { showErrorToast } from '../../components/ToastHelper';
import LogoNav from '../../components/LogoNav';
import BottomNav from '../../components/BottomNav';
import './GroupShows.css'

const GroupShows = () => {
    const navigate = useNavigate();
    const { groupId } = useParams(); //groupId to be passed to children
    const [ showsByGenre, setShowsByGenre ] = useState({});

    function groupByGenre(data) {
        const genreMap = {};

        data.forEach(show => {
            show.genres.forEach(genre => {
                if (!genreMap[genre]) {
                    genreMap[genre] = [];
                }
            
            genreMap[genre].push(show);    
            });
        });

        return genreMap;
    };

    useEffect(() => {
        const getShows = async () => {
            try {
                const response = await fetch('/getShows', {
                    method: 'GET'
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    showErrorToast(errorData.error)
                    throw new Error(errorData)
                }
    
                const data = await response.json();
                const genreData = groupByGenre(data);
                setShowsByGenre(genreData);
                
            }
            catch (error) {
                showErrorToast('An unexpected error occurred.');
                console.error(error);
            }
        };

        getShows();
    }, []);

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);


    return (
        <div className='group-shows'>
            <LogoNav />
            <BottomNav groupId={groupId}/>
        </div>
    );
};

export default GroupShows;