import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionCookie } from '../../components/CookieUtil';
import { showErrorToast } from '../../components/ToastHelper';
import LogoNav from '../../components/LogoNav';
import BottomNav from '../../components/BottomNav';
import ShowDetails from '../../components/ShowDetails';
import './GroupShows.css'

const GroupShows = () => {
    const navigate = useNavigate();
    const { groupId } = useParams(); //groupId to be passed to children
    const [ showsByGenre, setShowsByGenre ] = useState({});
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ showType, setShowType ] = useState('movie');
    const submitButtonText = 'Remove'

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
                const response = await fetch(`/getShows?groupId=${groupId}`, {
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
    }, [groupId]);

    useEffect(() => {
        if (!getSessionCookie()) {
            showErrorToast("Oops! Please sign in to continue.");
            navigate('/login');
        } 
    }, [navigate]);

    const handleSelectedItem = (show) => {
        setSelectedItem(show);
    };

    const handleCancelDetails = () => {
        setSelectedItem(null);
    };


    return (
        <div className='group-shows'>
            <LogoNav />
            {!selectedItem && (
                Object.keys(showsByGenre).filter(genre => showsByGenre[genre].some(show => show.media_type === showType)).map(genre => (
                    <div key={genre} className='row genre-row mb-3 no-gutters'>
                        <p className='h3'>{genre}</p>
                        <div className='card-deck'>
                            {showsByGenre[genre].filter(show => show.media_type === showType).map((show, index) => (
                                <div key={show.id || index} className='card' onClick={() => handleSelectedItem(show)}>
                                    <img className='card-img-top' src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.title || show.name}></img>
                                    <p className='h5'>{show.title || show.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )};

            {selectedItem && (
                <ShowDetails item={selectedItem} onCancel={handleCancelDetails} 
                // onSubmit={handleSubmit} 
                buttonText={submitButtonText} />
            )};
            <BottomNav groupId={groupId}/>
        </div>
    );
};

export default GroupShows;